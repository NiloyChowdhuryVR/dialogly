import { prisma } from './prisma';

export async function validateApiKey(apiKey: string): Promise<string | null> {
    if (!apiKey) {
        return null;
    }

    try {
        const apiKeyRecord = await prisma.apiKey.findUnique({
            where: { key: apiKey },
            include: { user: true },
        });

        if (!apiKeyRecord) {
            return null;
        }

        return apiKeyRecord.userId;
    } catch (error) {
        console.error('API key validation error:', error);
        return null;
    }
}
