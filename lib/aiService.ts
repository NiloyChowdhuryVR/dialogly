/**
 * AI Service for generating responses using OpenRouter API
 */

interface AIContext {
  websiteDescription: string;
  faqs: Array<{ question: string; answer: string }>;
  conversationHistory?: Array<{ role: string; content: string }>;
}

interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  reasoning_details?: any;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
      reasoning_details?: any;
    };
  }>;
}

export async function generateAIResponse(
  userMessage: string,
  context: AIContext
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    console.error('OPENROUTER_API_KEY is not configured');
    return 'I apologize, but the AI service is not properly configured. Please contact support.';
  }

  try {
    // Build system prompt with context
    const systemPrompt = buildSystemPrompt(context);

    // Build messages array
    const messages: OpenRouterMessage[] = [
      { role: 'system', content: systemPrompt },
      ...(context.conversationHistory || []).map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: userMessage },
    ];

    // Call OpenRouter API with reasoning enabled
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://dialogly.vercel.app',
        'X-Title': 'Dialogly Chatbot',
      },
      body: JSON.stringify({
        model: 'google/gemini-flash-1.5:free',
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      return 'I apologize, but I encountered an error processing your request. Please try again.';
    }

    const data: OpenRouterResponse = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      console.error('No response from OpenRouter API');
      return 'I apologize, but I could not generate a response. Please try again.';
    }

    return assistantMessage;
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    return 'I apologize, but I encountered an error. Please try again later.';
  }
}

/**
 * Build system prompt with website context and FAQs
 */
function buildSystemPrompt(context: AIContext): string {
  const { websiteDescription, faqs } = context;

  let prompt = `You are a helpful customer support assistant for a company.

Website Information:
${websiteDescription || 'No website description provided.'}`;

  if (faqs && faqs.length > 0) {
    prompt += `\n\nAvailable FAQs:
${faqs.map((faq, i) => `${i + 1}. Q: ${faq.question}\n   A: ${faq.answer}`).join('\n\n')}`;
  }

  prompt += `\n\nProvide helpful, accurate, and friendly responses based on this information. If you don't have enough information to answer a question, politely let the user know and offer to help with something else.`;

  return prompt;
}
