import { stem } from './stemmer';

const STOP_WORDS = new Set(['a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with']);

export function analyze(text: string): string[] {
  if (!text) return [];

  const tokens = text.toLowerCase().match(/[a-z]+/g) || [];
  
  return tokens
    .map(token => stem(token))
    .filter(token => token && !STOP_WORDS.has(token));
}