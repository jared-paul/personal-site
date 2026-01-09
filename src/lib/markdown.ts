/**
 * Utility functions for markdown processing
 */

/**
 * Extract a plain text excerpt from markdown content
 */
export function extractExcerpt(content: string, length: number = 160): string {
  // Remove markdown formatting
  const plain = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links, keep text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/^\s*[-*+]\s/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s/gm, '') // Remove numbered list markers
    .replace(/^>\s/gm, '') // Remove blockquotes
    .trim();

  if (plain.length <= length) {
    return plain;
  }

  return plain.slice(0, length).trim() + '...';
}

/**
 * Calculate estimated reading time for content
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
