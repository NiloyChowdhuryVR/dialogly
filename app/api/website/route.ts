import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { saveWebsiteSchema } from '@/lib/validation';
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

        const websiteData = await prisma.websiteData.findUnique({
            where: { userId: user.id },
        });

        return NextResponse.json({ description: websiteData?.description || '' });
    } catch (error) {
        console.error('Website GET error:', error);
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
        const validatedData = saveWebsiteSchema.parse(body);

        // Upsert website data
        const websiteData = await prisma.websiteData.upsert({
            where: { userId: user.id },
            update: { description: validatedData.description },
            create: {
                userId: user.id,
                description: validatedData.description,
            },
        });

        return NextResponse.json({ success: true, websiteData });
    } catch (error) {
        console.error('Website POST error:', error);
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
