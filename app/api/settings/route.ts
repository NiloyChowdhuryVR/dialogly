import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { saveSettingsSchema } from '@/lib/validation';
import { NextResponse } from 'next/server';

async function ensureUser(clerkId: string) {
    let user = await prisma.user.findUnique({
        where: { clerkId },
    });

    if (!user) {
        user = await prisma.user.create({
            data: { clerkId },
        });
    }

    return user;
}

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await ensureUser(userId);

        const settings = await prisma.chatbotSettings.findUnique({
            where: { userId: user.id },
        });

        return NextResponse.json({ settings });
    } catch (error) {
        console.error('Settings GET error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await ensureUser(userId);
        const body = await request.json();

        // Validate input
        const validatedData = saveSettingsSchema.parse(body);

        // Upsert settings
        const settings = await prisma.chatbotSettings.upsert({
            where: { userId: user.id },
            update: {
                name: validatedData.name,
                color: validatedData.color,
                greeting: validatedData.greeting,
                position: validatedData.position,
                aiMode: validatedData.aiMode,
            },
            create: {
                userId: user.id,
                name: validatedData.name,
                color: validatedData.color,
                greeting: validatedData.greeting,
                position: validatedData.position,
                aiMode: validatedData.aiMode,
            },
        });

        return NextResponse.json({ success: true, settings });
    } catch (error) {
        console.error('Settings POST error:', error);
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
