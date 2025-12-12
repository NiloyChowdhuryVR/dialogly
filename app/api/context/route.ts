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

        return NextResponse.json({
            websiteDescription: websiteData?.description || '',
            faqs: faqs || [],
            settings: settings || {
                name: 'AI Assistant',
                color: '#3b82f6',
                greeting: 'Hello! How can I help you today?',
                position: 'right',
            },
        });
    } catch (error) {
        console.error('Context API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
