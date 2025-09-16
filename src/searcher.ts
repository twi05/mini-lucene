import { analyze } from './analyzer';
import { Indexer } from './indexer';
import { Document, IndexEntry } from './types';

export class Searcher {
  private cache: Map<string, Document[]> = new Map();
  private MAX_CACHE_SIZE = 100;

  constructor(private indexer: Indexer) {}

  public search(query: string): Document[] {
    if (this.cache.has(query)) {
      const cached = this.cache.get(query)!;
      // Refresh LRU order by re-setting the key
      this.cache.delete(query);
      this.cache.set(query, cached);
      return cached;
    }

    const phraseMatch = query.match(/"(.*?)"/);
    let results: Document[];

    if (phraseMatch) {
      results = this._searchPhrase(phraseMatch[1]);
    } else {
      results = this._searchTfIdf(query);
    }
    
    // Update cache
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      const firstKey = this.cache.keys().next().value!;
      this.cache.delete(firstKey); // Evict least-recently used (by insertion order)
    }
    this.cache.set(query, results);
    
    return results;
  }

  private _searchPhrase(phrase: string): Document[] {
    const tokens = analyze(phrase);
    if (tokens.length === 0) return [];

    const index = this.indexer.getIndex();
    // Early exit if any token is missing from the index
    for (const token of tokens) {
      if (!index.get(token)) return [];
    }
    const firstTokenEntry = index.get(tokens[0]);
    if (!firstTokenEntry) return [];

    const matchingDocIds: Set<number> = new Set();
    
    for (const [docId, posting] of firstTokenEntry.postings.entries()) {
      // Build fast lookup sets for subsequent tokens' positions in this document
      const subsequentPositionSets: Array<Set<number>> = [];
      for (let i = 1; i < tokens.length; i++) {
        const entry = index.get(tokens[i])!;
        const p = entry.postings.get(docId);
        if (!p) { subsequentPositionSets.length = 0; break; }
        subsequentPositionSets.push(new Set(p.positions));
      }
      if (subsequentPositionSets.length !== tokens.length - 1) continue;

      for (const pos of posting.positions) {
        let isMatch = true;
        for (let i = 1; i < tokens.length; i++) {
          const positionSet = subsequentPositionSets[i - 1];
          if (!positionSet.has(pos + i)) {
            isMatch = false;
            break;
          }
        }
        if (isMatch) {
          matchingDocIds.add(docId);
          break; // Found match in this doc, move to next doc
        }
      }
    }
    
    return Array.from(matchingDocIds).map(id => this.indexer.getDocument(id)!);
  }

  private _searchTfIdf(query: string): Document[] {
    // De-duplicate query tokens to avoid overweighting duplicates and speed joins
    const queryTokens = Array.from(new Set(analyze(query)));
    const index = this.indexer.getIndex();
    const scores = new Map<number, number>();

    const postingLists = queryTokens
      .map(token => index.get(token))
      .filter((entry): entry is IndexEntry => !!entry)
      .sort((a, b) => a.postings.size - b.postings.size);

    if (postingLists.length === 0) return [];

    const rarestList = postingLists[0];
    for (const [docId] of rarestList.postings.entries()) {
    
      const hasAllTerms = postingLists.slice(1).every(list => list.postings.has(docId));

      if (hasAllTerms) {
        let totalScore = 0;
        for (const list of postingLists) {
          const posting = list.postings.get(docId)!;
          totalScore += posting.termFrequency * list.inverseDocumentFrequency;
        }
        scores.set(docId, totalScore);
      }
    }
    
    const sortedDocIds = Array.from(scores.keys()).sort((a, b) => scores.get(b)! - scores.get(a)!);
    
    return sortedDocIds.map(id => this.indexer.getDocument(id)!);
  } 
}