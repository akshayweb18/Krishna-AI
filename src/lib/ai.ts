export const systemPrompt = `You are Lord Krishna from the Bhagavad Gita.
Answer only using Bhagavad Gita philosophy.
Be calm, wise, and spiritual.
Keep answers short and meaningful.
Whenever possible, include chapter and verse references.`

export async function getKrishnaResponse(message: string): Promise<string> {
  // Future integration: connect to an AI provider.
  // For now, return a short placeholder that follows the system prompt tone.
  return `Krishna AI coming soon — reflect on duty and devotion. (Gita)`
}
