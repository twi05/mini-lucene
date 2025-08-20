import { Indexer } from './src/indexer';
import { Searcher } from './src/searcher';
import { Document } from './src/types';

function main() {
  console.log('--- Mini Lucene in TypeScript ---');
  
  const docs: Document[] = [
    { id: 'A', title: 'Learning JavaScript', body: 'A popular guide to the basics of JavaScript programming.' },
    { id: 'B', title: 'Advanced Guide to JavaScript', body: 'An advanced guide for building complex JavaScript applications.' },
    { id: 'C', title: 'Building a Search Engine', body: 'How to build a search engine from scratch. This guide is on building a search engine.' }
  ];

  console.log('\n Indexing documents...');
  const indexer = new Indexer();
  docs.forEach(doc => indexer.addDocument(doc));
  indexer.calculateIdf();
  console.log(' Indexing complete!');

  const searcher = new Searcher(indexer);

  console.log('\n--- SEARCH TESTS ---');
  
  const query1 = 'javascript guide';
  console.log(`\n Scored search for: "${query1}"`);
  const results1 = searcher.search(query1);
  console.log(results1.map(r => ({ id: r.id, title: r.title })));

  const query2 = '"building a search engine"';
  console.log(`\n Phrase search for: ${query2}`);
  const results2 = searcher.search(query2);
  console.log(results2.map(r => ({ id: r.id, title: r.title })));
  
  const query3 = 'build';
  console.log(`\n Stemmed search for: "${query3}"`);
  const results3 = searcher.search(query3);
  console.log(results3.map(r => ({ id: r.id, title: r.title })));
  
  console.log(`\n Running first query again to test cache...`);
  const results4 = searcher.search(query1); // Should hit the cache
  console.log(results4.map(r => ({ id: r.id, title: r.title })));
}

main();