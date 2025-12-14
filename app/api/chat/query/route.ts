import { prisma } from '@/lib/prisma';
import { validateApiKey } from '@/lib/apiKeyAuth';
import { findBestFAQMatch } from '@/lib/faqMatcher';
import { generateAIResponse } from '@/lib/aiService';
import { chatQuerySchema } from '@/lib/validation';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
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

        // Parse and validate request body
        const body = await request.json();
        const validatedData = chatQuerySchema.parse(body);

        // Fetch user's context data and settings
        const [websiteData, faqs, settings] = await Promise.all([
            prisma.websiteData.findUnique({
                where: { userId },
            }),
            prisma.fAQ.findMany({
                where: { userId },
            }),
            prisma.chatbotSettings.findUnique({
                where: { userId },
                select: { aiMode: true },
            }),
        ]);

        let responseMessage: string;
        let usedFAQ = false;

        // Try to find a matching FAQ first
        const matchingFAQ = findBestFAQMatch(validatedData.message, faqs);

        if (matchingFAQ) {
            // Use FAQ answer
            responseMessage = matchingFAQ.answer;
            usedFAQ = true;
        } else if (settings?.aiMode) {
            // Only generate AI response if AI mode is enabled
            responseMessage = await generateAIResponse(validatedData.message, {
                websiteDescription: websiteData?.description || '',
                faqs: faqs.map((faq) => ({
                    question: faq.question,
                    answer: faq.answer,
                })),
            });
        } else {
            // AI mode is OFF and no FAQ match - return helpful message
            responseMessage = "I'm sorry, I don't have a specific answer for that question. Please try one of the suggested options or contact our support team for assistance.";
        }

        // Save messages to database
        await prisma.message.createMany({
            data: [
                {
                    userId,
                    role: 'user',
                    content: validatedData.message,
                },
                {
                    userId,
                    role: 'assistant',
                    content: responseMessage,
                },
            ],
        });

        return NextResponse.json({
            message: responseMessage,
            role: 'assistant',
            source: usedFAQ ? 'faq' : 'ai',
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
            }
        });
    } catch (error) {
        console.error('Chat query error:', error);
        if (error instanceof Error && 'issues' in error) {
            return NextResponse.json(
                { error: 'Validation error', details: error },
                {
                    status: 400,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
                    }
                }
            );
        }
        return NextResponse.json(
            { error: 'Internal server error' },
            {
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
        },
    });
}
