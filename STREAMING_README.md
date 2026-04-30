# Gemini AI Chat Architecture (Cloud Streaming)

This project uses **Google Gemini 2.0 Flash** for fast, high-intelligence divine guidance.

## Server Endpoints
- `POST /api/chat` — Standard chat API.
- `GET /api/chat/stream?prompt=...` — Cloud streaming endpoint using Gemini.

## Environment Configuration (`.env.local`)
- `GEMINI_API_KEY` — **Required**. Your Google AI Studio API key.
- `GEMINI_MODEL` — Optional. Defaults to `gemini-2.0-flash`.

## Model Hierarchy (Automatic Fallback)
1. **Primary**: `gemini-2.0-flash`
2. **Fallback**: `gemini-1.5-flash`

## Persona
The AI is guided by the `krishnaSystem` prompt using Gemini's native `system_instruction` for high-fidelity roleplay as Krishna.

## Performance
By using the cloud-based Gemini API with streaming, the application provides near-instant responses while handling complex spiritual queries with high accuracy.
