export interface Document {
    id: string | number;
    [key: string]: any;
  }
  
  export interface Posting {
    termFrequency: number;
    positions: number[];
  }
  
  export interface IndexEntry {
    inverseDocumentFrequency: number;
    postings: Map<number, Posting>;
  }
  
  export type InvertedIndex = Map<string, IndexEntry>;