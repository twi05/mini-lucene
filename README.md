
# Mini Search: A Lightweight Search Engine in TypeScript

<p>
  <img src="https://img.shields.io/npm/v/[your-npm-package-name]?style=flat-square" alt="NPM Version">
  <img src="https://img.shields.io/github/license/[your-github-username]/[your-repo-name]?style=flat-square" alt="License">
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

## 🤔 Why This Project?

Have you ever wondered how Elasticsearch can sift through terabytes of data in milliseconds? This project started as a personal quest to answer that question. By building the core components of a search engine myself, I was able to gain a deep understanding of the elegant principles that make modern search possible.

This library is primarily an educational tool and is not intended for large-scale production use, but it serves as a clear, commented implementation of foundational search algorithms.

## 🚀 Installation

```bash
npm install [your-npm-package-name]
```
