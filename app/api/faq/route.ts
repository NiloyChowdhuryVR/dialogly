import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import {
    createFAQSchema,
    updateFAQSchema,
    deleteFAQSchema,
} from '@/lib/validation';
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

        const faqs = await prisma.fAQ.findMany({
            where: { userId: user.id },
            orderBy: { id: 'asc' },
        });

        return NextResponse.json({ faqs });
    } catch (error) {
        console.error('FAQ GET error:', error);
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
        const validatedData = createFAQSchema.parse(body);

        const faq = await prisma.fAQ.create({
            data: {
                userId: user.id,
                question: validatedData.question,
                answer: validatedData.answer,
            },
        });

        return NextResponse.json({ success: true, faq });
    } catch (error) {
        console.error('FAQ POST error:', error);
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

export async function PUT(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await ensureUser(userId);
        const body = await request.json();

        // Validate input
        const validatedData = updateFAQSchema.parse(body);

        // Verify ownership
        const existingFaq = await prisma.fAQ.findUnique({
            where: { id: validatedData.id },
        });

        if (!existingFaq || existingFaq.userId !== user.id) {
            return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
        }

        const faq = await prisma.fAQ.update({
            where: { id: validatedData.id },
            data: {
                question: validatedData.question,
                answer: validatedData.answer,
            },
        });

        return NextResponse.json({ success: true, faq });
    } catch (error) {
        console.error('FAQ PUT error:', error);
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

export async function DELETE(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await ensureUser(userId);
        const body = await request.json();

        // Validate input
        const validatedData = deleteFAQSchema.parse(body);

        // Verify ownership
        const existingFaq = await prisma.fAQ.findUnique({
            where: { id: validatedData.id },
        });

        if (!existingFaq || existingFaq.userId !== user.id) {
            return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
        }

        await prisma.fAQ.delete({
            where: { id: validatedData.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('FAQ DELETE error:', error);
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
