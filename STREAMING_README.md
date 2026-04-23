Streaming chat (SSE) usage

Server endpoints added:
- `POST /api/chat` — existing chat API (non-streaming by default). Accepts `{ messages: [...] }` or `{ prompt: '...' }`. Use `stream: false` to force non-streaming.
- `GET /api/chat/stream?prompt=...` — SSE streaming endpoint. Uses `GEMINI_API_URL` if set, otherwise OpenAI streaming.

Environment:
- `GEMINI_API_KEY` — API key for Gemini (preferred) or set `OPENAI_API_KEY` for OpenAI.
- `GEMINI_API_URL` — REST endpoint for Gemini streaming POST (required for Gemini usage).
- `GEMINI_MODEL` — defaults to `gemini-1.5-flash` when using Gemini.

Client example (EventSource): see `src/components/ChatStreamClient.tsx`

Notes:
- Rate limiting: simple in-memory limiter (60 req / minute per IP). Not suitable for multi-instance production.
- Error handling: upstream errors are returned as JSON when stream cannot be opened.
- SSE stream frames are emitted as `data: ...` events. The client should append chunks until stream ends.
