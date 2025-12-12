// Database Models
export interface User {
    id: string;
    clerkId: string;
    createdAt: Date;
}

export interface ApiKey {
    id: string;
    userId: string;
    key: string;
    createdAt: Date;
}

export interface WebsiteData {
    id: string;
    userId: string;
    description: string;
}

export interface FAQ {
    id: string;
    userId: string;
    question: string;
    answer: string;
}

export interface ChatbotSettings {
    id: string;
    userId: string;
    name: string;
    color: string;
    greeting: string;
    position: string;
}

export interface Message {
    id: string;
    userId: string;
    role: string;
    content: string;
    createdAt: Date;
}

// API Request/Response Types
export interface GenerateApiKeyRequest {
    clerkId: string;
}

export interface GenerateApiKeyResponse {
    apiKey: string;
}

export interface ContextResponse {
    websiteDescription: string;
    faqs: FAQ[];
    settings: ChatbotSettings;
}

export interface ChatQueryRequest {
    message: string;
}

export interface ChatQueryResponse {
    message: string;
    role: string;
}

export interface SaveWebsiteRequest {
    description: string;
}

export interface CreateFAQRequest {
    question: string;
    answer: string;
}

export interface UpdateFAQRequest {
    id: string;
    question: string;
    answer: string;
}

export interface SaveSettingsRequest {
    name: string;
    color: string;
    greeting: string;
    position: string;
}

export interface MessageStats {
    totalMessages: number;
    messagesPerDay: { date: string; count: number }[];
}

// Chatbot Component Types
export interface ChatbotProps {
    apiKey: string;
    theme?: 'light' | 'dark';
    position?: 'left' | 'right';
    greeting?: string;
    name?: string;
    color?: string;
    apiUrl?: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}
