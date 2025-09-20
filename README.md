# MiniSearch: A pocket-sized Elasticsearch for your projects

[![npm version](https://img.shields.io/npm/v/mini-search-lib?style=flat-square)](https://www.npmjs.com/package/mini-search-lib)
[![license](https://img.shields.io/github/license/twi05/mini-lucene?style=flat-square)](./LICENSE)
![language](https://img.shields.io/badge/language-TypeScript-blue?style=flat-square)

MiniSearch is a **lightweight, zero-dependency, in-memory full-text search engine** built from scratch in TypeScript.  
It brings the power of Elasticsearch's **search features** — without servers, clusters, or complex infra.

✨ Perfect for:
- Side projects & prototypes  
- Educational use (learn how search engines work)  
- Lightweight apps that don't need distributed infra

---

## Why MiniSearch?

Elasticsearch is powerful, but heavy — it requires JVM, infra, and clusters, and often provides more than small projects need.

**MiniSearch** focuses purely on **search** and provides:
- 🔎 **Inverted Index** — maps terms to documents efficiently  
- 📊 **TF-IDF Scoring** — ranks results by relevance, not just by presence  
- 📝 **Phrase Search** — exact phrase queries using double quotes (`"search engine"`)  
- 🌱 **Stemming** — Porter stemmer reduces words to roots (e.g., `building` → `build`)  
- 🚫 **Stop Word Filtering** — ignores common filler words to reduce noise  
- 🪶 **Zero Dependencies** — pure TypeScript, runs anywhere  
- ⚡ **In-Memory** — fast for small/medium datasets

Think of it as **Elasticsearch's little sibling** — same brain, smaller footprint.

---

## Installation

```bash
npm install mini-search-lib
# or
yarn add mini-search-lib
```

## Quick Start

```ts
import { MiniSearch } from 'mini-search-lib';

const engine = new MiniSearch([
  { id: 1, title: 'Learning JavaScript', body: 'A popular guide to JavaScript basics.' },
  { id: 2, title: 'Advanced Guide to JavaScript', body: 'Build complex JavaScript apps.' },
  { id: 3, title: 'Building a Search Engine', body: 'How to build a search engine from scratch.' }
]);

console.log(engine.search('javascript guide'));
console.log(engine.search('"building a search engine"')); // phrase search
console.log(engine.search('build')); // stemming matches "building"
```

<details>
<summary>CommonJS example</summary>

```js
const { MiniSearch } = require('mini-search-lib');

const engine = new MiniSearch();
engine.addDocuments([{ id: 1, title: 'Hello', body: 'World' }]);
console.log(engine.search('hello'));
```
</details>

## Usage

- **Indexing at construction**: pass an array of documents when creating `MiniSearch`.  
- **Add later**: call `addDocuments(docs)` to append documents and update IDF weights.  
- **Search**: `search(query: string)` returns an array of matching documents ranked by relevance.  

### Document shape

```ts
type Document = {
  id: string | number;
  // Any other string fields will be indexed (title, body, description, etc.)
  [key: string]: any;
}
```

**Notes:**
- `id` is treated as an identifier and not analyzed.
- All other string fields are tokenized, stemmed, and indexed.

### Query features

- **TF-IDF ranking** — multi-term queries are ranked by term frequency × inverse document frequency.
- **Phrase search** — wrap exact phrases in double quotes, e.g., `"data structures"`.
- **Stemming** — Porter stemmer reduces words to root forms (e.g., `running` → `run`).
- **Stop words** — common words (e.g., `the`, `and`) are ignored to reduce noise.

## How It Works

MiniSearch implements the core building blocks of modern search engines:

- **Inverted Index** — a mapping of terms → documents that contain them.
- **TF-IDF Scoring** — prioritizes rarer, more meaningful terms for relevance ranking.
- **Stemming + Stop Words** — improves relevance and reduces index size/noise.
- **Exact Phrase Queries** — supports exact matches vs. loose multi-term matches.

If you've ever wondered how Elasticsearch works under the hood — this is that core, simplified and hackable.

## When to Use

✅ **Use MiniSearch when:**
- You're building a prototype, side project, or hackathon app.
- You want to quickly add search functionality without complex setup.
- You don't need distributed infra, analytics, or persistence.

❌ **Don't use MiniSearch when:**
- You need to search millions of documents at scale.
- You require analytics, aggregations, logging pipelines, or observability stacks.
- You need durable persistence out of the box (MiniSearch is in-memory).

## Minimal API Reference

- `new MiniSearch(docs?: Document[])` — creates a search engine and optionally indexes provided documents.
- `addDocuments(docs: Document[]): void` — adds documents and updates internal weights.
- `search(query: string): Document[]` — returns matched documents, ranked by TF-IDF.

## Roadmap

- BM25 scoring (closer to Elasticsearch relevance)
- Highlighting matched snippets in results
- Optional index persistence to disk
- Configurable tokenization and custom analyzers

## Development (from source)

```bash
git clone https://github.com/twi05/mini-search-lib.git
cd mini-search-lib
npm install
npm run build
```

Use the built artifact from `dist/` or publish the package under the npm name you choose.

## Contributing

Contributions welcome — open issues/PRs, propose features, or submit bug fixes.  
Please follow the repository's code style`.