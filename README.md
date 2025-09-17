
# Mini Search: A Lightweight Search Engine in TypeScript

<p>
  <img src="https://img.shields.io/npm/v/mini-search-lib?style=flat-square" alt="NPM Version">
  <img src="https://img.shields.io/github/license/twi05/mini-lucene?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/language-TypeScript-blue?style=flat-square" alt="Language">
</p>

A lightweight, zero-dependency, in-memory full-text search engine built from scratch in TypeScript. 

## ✨ Features

* **Inverted Index**: Efficiently maps terms to the documents that contain them.
* **TF-IDF Scoring**: Ranks search results by relevance, not just by presence.
* **Phrase Searching**: Supports exact phrase queries using double quotes (e.g., `"search engine"`).
* **Stemming**: Uses the Porter Stemmer algorithm to match words by their root form (e.g., "building" matches "build").
* **Stop Word Filtering**: Ignores common words to improve relevance and reduce index size.
* **Zero Dependencies**: Written in pure TypeScript with no external libraries.


## 🚀 Installation

```bash
npm install mini-search-lib
```

## 📦 Quick Start

```js
// CommonJS
const { LiteSearch } = require('mini-search-lib');

// Create engine and index some documents
const search = new LiteSearch([
  { id: 1, title: 'Learning JavaScript', body: 'A popular guide to JavaScript basics.' },
  { id: 2, title: 'Advanced Guide to JavaScript', body: 'Build complex JavaScript apps.' },
  { id: 3, title: 'Building a Search Engine', body: 'How to build a search engine from scratch.' }
]);

// Run searches
console.log(search.search('javascript guide'));
console.log(search.search('"building a search engine"')); // phrase search
console.log(search.search('build')); // stemming matches "building"
```

## 🧠 Usage

- **Indexing at construction**: Pass an array of documents when creating `LiteSearch`.
- **Add later**: Use `addDocuments(docs)`. Re-computes IDF automatically.
- **Search**: `search(query: string)` returns an array of matching documents, ranked by TF‑IDF.

### Document shape

```ts
type Document = {
  id: string | number;
  // Any other string fields will be indexed (e.g., title, body, description)
  [key: string]: any;
}
```

Notes:
- The field `id` is treated as an identifier and not analyzed.
- All other string fields are tokenized, stemmed, and added to the inverted index.

### Query features

- **TF‑IDF ranking**: Multi-term queries are ranked by term frequency × inverse document frequency.
- **Phrase search**: Wrap a phrase in double quotes, e.g., `"data structures"`.
- **Stemming**: Porter stemmer reduces words to roots (e.g., "running" → "run").
- **Stop words**: Common words (e.g., "the", "and") are ignored.

## 🧪 TypeScript example

```ts
import { LiteSearch } from 'mini-search-lib';

const docs = [
  { id: 'A', title: 'Intro to TS', body: 'TypeScript adds types to JavaScript.' },
  { id: 'B', title: 'TS Advanced', body: 'Generics, utility types, and more.' },
];

const engine = new LiteSearch(docs);

// Add more docs later
engine.addDocuments([{ id: 'C', title: 'Build a search', body: 'Implement a simple search engine.' }]);

const results = engine.search('typescript search');
console.log(results.map(d => d.id));
```

## ⚙️ From source

```bash
# Clone and install
git clone https://github.com/twi05/mini-lucene.git
cd mini-lucene
npm install

# Build
npm run build

# Use the built artifact from dist/
node dist/src/index.js
```

## 🔍 API reference (minimal)

- `new LiteSearch(docs?: Document[])`
  - Creates a search engine and indexes the provided documents (optional).
- `addDocuments(docs: Document[]): void`
  - Adds documents and updates IDF weights.
- `search(query: string): Document[]`
  - Returns ranked results. Supports phrases with quotes.
