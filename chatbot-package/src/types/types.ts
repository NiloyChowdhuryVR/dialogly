export interface ChatbotProps {
    apiKey: string;
    theme?: 'light' | 'dark';
    position?: 'left' | 'right';
    greeting?: string;
    name?: string;
    color?: string;
    apiUrl?: string; // Optional - defaults to production Dialogly API
    testMode?: boolean; // Enable test mode with mock responses
}

export interface ChatbotSettings {
    theme: 'light' | 'dark';
    color: string;
    position: 'left' | 'right';
    greeting: string;
    name: string;
    aiMode: boolean;
    quickReplies?: QuickReply[];
}

export interface QuickReply {
    id: string;
    label: string;
    response: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface ChatQueryResponse {
    message: string;
    role: string;
    source?: string;
}
