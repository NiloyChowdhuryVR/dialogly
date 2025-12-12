import { z } from 'zod';

// API Key Generation
export const generateApiKeySchema = z.object({
    clerkId: z.string().min(1, 'Clerk ID is required'),
});

// Website Data
export const saveWebsiteSchema = z.object({
    description: z.string().min(1, 'Description is required').max(10000, 'Description is too long'),
});

// FAQ Schemas
export const createFAQSchema = z.object({
    question: z.string().min(1, 'Question is required').max(500, 'Question is too long'),
    answer: z.string().min(1, 'Answer is required').max(2000, 'Answer is too long'),
});

export const updateFAQSchema = z.object({
    id: z.string().min(1, 'FAQ ID is required'),
    question: z.string().min(1, 'Question is required').max(500, 'Question is too long'),
    answer: z.string().min(1, 'Answer is required').max(2000, 'Answer is too long'),
});

export const deleteFAQSchema = z.object({
    id: z.string().min(1, 'FAQ ID is required'),
});

// Chatbot Settings
export const saveSettingsSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format'),
    greeting: z.string().min(1, 'Greeting is required').max(200, 'Greeting is too long'),
    position: z.enum(['left', 'right'], {
        errorMap: () => ({ message: 'Position must be left or right' }),
    }),
});

// Chat Query
export const chatQuerySchema = z.object({
    message: z.string().min(1, 'Message is required').max(1000, 'Message is too long'),
});

// API Key Header Validation
export const apiKeyHeaderSchema = z.string().min(1, 'API key is required');

// Helper function to validate data
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
    return schema.parse(data);
}

// Helper function to safely validate data
export function safeValidateData<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, error: result.error };
}
