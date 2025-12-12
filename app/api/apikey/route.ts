import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

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

        const apiKey = await prisma.apiKey.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ apiKey: apiKey?.key || null });
    } catch (error) {
        console.error('API Key GET error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await ensureUser(userId);

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
        console.error('API Key POST error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
