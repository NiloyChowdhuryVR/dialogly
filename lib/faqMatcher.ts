import type { FAQ } from './types';

/**
 * Calculate similarity between two strings using Levenshtein distance
 */
function levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
}

/**
 * Calculate similarity score between 0 and 1
 */
function calculateSimilarity(str1: string, str2: string): number {
    const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
    const maxLength = Math.max(str1.length, str2.length);
    return maxLength === 0 ? 1 : 1 - distance / maxLength;
}

/**
 * Find the best matching FAQ for a given question
 */
export function findBestFAQMatch(
    question: string,
    faqs: FAQ[],
    threshold: number = 0.6
): FAQ | null {
    if (faqs.length === 0) {
        return null;
    }

    let bestMatch: FAQ | null = null;
    let bestScore = 0;

    for (const faq of faqs) {
        const score = calculateSimilarity(question, faq.question);
        if (score > bestScore && score >= threshold) {
            bestScore = score;
            bestMatch = faq;
        }
    }

    return bestMatch;
}

/**
 * Check if question contains keywords from FAQ
 */
export function containsKeywords(question: string, faq: FAQ): boolean {
    const questionWords = question.toLowerCase().split(/\s+/);
    const faqWords = faq.question.toLowerCase().split(/\s+/);

    // Check if at least 50% of FAQ words are in the question
    const matchCount = faqWords.filter((word) =>
        questionWords.some((qWord) => qWord.includes(word) || word.includes(qWord))
    ).length;

    return matchCount / faqWords.length >= 0.5;
}
