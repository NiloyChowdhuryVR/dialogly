import { prisma } from '@/lib/prisma';
import { validateApiKey } from '@/lib/apiKeyAuth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        // Get API key from header
        const apiKey = request.headers.get('x-api-key');

        if (!apiKey) {
            return NextResponse.json(
                { error: 'API key is required' },
                { status: 401 }
            );
        }

        // Validate API key and get user ID
        const userId = await validateApiKey(apiKey);

        if (!userId) {
            return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
        }

        // Fetch user's context data
        const [websiteData, faqs, settings] = await Promise.all([
            prisma.websiteData.findUnique({
                where: { userId },
            }),
            prisma.fAQ.findMany({
                where: { userId },
            }),
            prisma.chatbotSettings.findUnique({
                where: { userId },
            }),
        ]);

        // Generate quick replies from FAQs (top 4)
        const quickReplies = faqs.slice(0, 4).map((faq, index) => ({
            id: `faq-${index}`,
            label: faq.question.length > 40 ? faq.question.substring(0, 37) + '...' : faq.question,
            response: faq.answer,
        }));

        // Add default quick replies if no FAQs exist
        const defaultQuickReplies = [
            { id: 'default-1', label: 'Learn More', response: 'I\'d be happy to tell you more about our services!' },
            { id: 'default-2', label: 'Contact Support', response: 'You can reach our support team anytime. How can I assist you?' },
            { id: 'default-3', label: 'Pricing', response: 'Let me help you with pricing information!' },
            { id: 'default-4', label: 'Get Started', response: 'Great! Let\'s get you started. What would you like to know?' },
        ];

        return NextResponse.json({
            websiteDescription: websiteData?.description || '',
            faqs: faqs || [],
            settings: {
                ...settings,
                name: settings?.name || 'AI Assistant',
                color: settings?.color || '#3b82f6',
                greeting: settings?.greeting || 'Hello! How can I help you today?',
                position: settings?.position || 'right',
                aiMode: settings?.aiMode ?? true,
                quickReplies: quickReplies.length > 0 ? quickReplies : defaultQuickReplies,
            },
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
            }
        });
    } catch (error) {
        console.error('Context API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            {
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
                }
            }
        );
    }
}

// Enable CORS for chatbot widget
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
        },
    });
}
