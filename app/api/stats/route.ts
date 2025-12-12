import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
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

        // Get total messages
        const totalMessages = await prisma.message.count({
            where: { userId: user.id },
        });

        // Get messages per day for the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const messages = await prisma.message.findMany({
            where: {
                userId: user.id,
                createdAt: {
                    gte: sevenDaysAgo,
                },
            },
            select: {
                createdAt: true,
            },
        });

        // Group by date
        const messagesByDate = messages.reduce((acc, msg) => {
            const date = msg.createdAt.toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // Convert to array format
        const messagesPerDay = Object.entries(messagesByDate)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => a.date.localeCompare(b.date));

        return NextResponse.json({
            totalMessages,
            messagesPerDay,
        });
    } catch (error) {
        console.error('Stats GET error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
