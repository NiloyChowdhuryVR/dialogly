import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get or create user
        let user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            user = await prisma.user.create({
                data: { clerkId: userId },
            });
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error('User API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
