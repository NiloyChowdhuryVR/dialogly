import { prisma } from '@/lib/prisma';
import { generateApiKeySchema } from '@/lib/validation';
import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = generateApiKeySchema.parse(body);

        // Find or create user
        let user = await prisma.user.findUnique({
            where: { clerkId: validatedData.clerkId },
        });

        if (!user) {
            user = await prisma.user.create({
                data: { clerkId: validatedData.clerkId },
            });
        }

        // Generate a secure API key
        const key = `dlg_${randomBytes(32).toString('hex')}`;

        // Delete old API keys for this user
        await prisma.apiKey.deleteMany({
            where: { userId: user.id },
        });

        // Create new API key
        const apiKey = await prisma.apiKey.create({
            data: {
                userId: user.id,
                key,
            },
        });

        return NextResponse.json({ apiKey: apiKey.key });
    } catch (error) {
        console.error('API Key generation error:', error);
        if (error instanceof Error && 'issues' in error) {
            return NextResponse.json(
                { error: 'Validation error', details: error },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
