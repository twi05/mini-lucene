import { analyze } from './analyzer';
import { Document, InvertedIndex, Posting } from './types';

export class Indexer {
  private invertedIndex: InvertedIndex = new Map();
  private documents: Map<number, Document> = new Map();
  private docCount = 0;

  public addDocument(doc: Document): void {
    const docId = this.docCount;
    this.documents.set(docId, doc);

    const positionsInDoc: Map<string, number[]> = new Map();
    let totalTokenCount = 0;

    // 1. Analyze and gather token positions
    for (const field in doc) {
      // Skip non-text fields and avoid analyzing the document identifier
      if (field === 'id') continue;
      if (typeof doc[field] === 'string') {
        const tokens = analyze(doc[field]);
        totalTokenCount += tokens.length;
        
        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i];
          if (!positionsInDoc.has(token)) {
            positionsInDoc.set(token, []);
          }
          positionsInDoc.get(token)!.push(i);
        }
      }
    }

    // 2. Update the inverted index
    for (const [token, positions] of positionsInDoc.entries()) {
      if (!this.invertedIndex.has(token)) {
        this.invertedIndex.set(token, { inverseDocumentFrequency: 0, postings: new Map() });
      }
      const entry = this.invertedIndex.get(token)!;
      
      const posting: Posting = {
        termFrequency: positions.length / totalTokenCount,
        positions: positions,
      };
      entry.postings.set(docId, posting);
    }
    
    this.docCount++;
  }

  public calculateIdf(): void {
    const totalDocs = this.docCount;
    for (const entry of this.invertedIndex.values()) {
      const numDocsWithToken = entry.postings.size;
      entry.inverseDocumentFrequency = Math.log(totalDocs / numDocsWithToken);
    }
  }

  // Allow Searcher to access index data
  public getIndex(): InvertedIndex { return this.invertedIndex; }
  public getDocument(docId: number): Document | undefined { return this.documents.get(docId); }
}