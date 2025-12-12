import type { ChatQueryResponse, ChatbotSettings } from '../types/types';

// Default production API URL
const DEFAULT_API_URL = 'https://api.dialogly.ai/api/chat/query';
const DEFAULT_CONTEXT_URL = 'https://api.dialogly.ai/api/context';

// Mock responses for test mode
const MOCK_RESPONSES = [
    "Thanks for your question! I'm running in test mode. In production, I'll provide real AI-powered answers based on your FAQs and website content.",
    "Great question! This is a demo response. Once you deploy your Dialogly API, I'll give you intelligent answers based on your configured knowledge base.",
    "I'm here to help! Currently in test mode. After you set up your API, I'll be able to answer questions about your business, products, and services.",
    "Hello! I'm a demo chatbot. In production mode, I'll use your FAQs and AI to provide accurate, helpful responses to your customers.",
    "Thanks for testing! When connected to your Dialogly API, I'll be able to match questions to your FAQs and generate smart responses.",
];

export async function fetchChatbotSettings(
    apiKey: string,
    apiUrl?: string,
    testMode?: boolean
): Promise<ChatbotSettings | null> {
    // Test mode - return default settings
    if (testMode) {
        return {
            theme: 'light',
            color: '#22c55e',
            position: 'right',
            greeting: 'Hello! How can I help you today?',
            name: 'AI Assistant',
        };
    }

    // Construct context URL from chat URL or use default
    const contextUrl = apiUrl
        ? apiUrl.replace('/chat/query', '/context')
        : DEFAULT_CONTEXT_URL;

    try {
        const response = await fetch(contextUrl, {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch chatbot settings:', response.status);
            return null;
        }

        const data = await response.json();

        // Extract chatbot settings from the response
        if (data.chatbotSettings) {
            return {
                theme: data.chatbotSettings.theme || 'light',
                color: data.chatbotSettings.primaryColor || '#22c55e',
                position: data.chatbotSettings.position || 'right',
                greeting: data.chatbotSettings.welcomeMessage || 'Hello! How can I help you today?',
                name: data.chatbotSettings.chatbotName || 'AI Assistant',
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching chatbot settings:', error);
        return null;
    }
}

export async function sendChatMessage(
    message: string,
    apiKey: string,
    apiUrl?: string,
    testMode?: boolean
): Promise<ChatQueryResponse> {
    // Test mode - return mock responses
    if (testMode) {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));

        const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];

        return {
            message: randomResponse,
            role: 'assistant',
            source: 'test_mode',
        };
    }

    // Use provided URL or default to production
    const url = apiUrl || DEFAULT_API_URL;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Chat API error:', error);
        throw error;
    }
}
