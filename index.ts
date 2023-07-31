// import spacy from './dist/index.js';
import spacy from './src/index';

const info = spacy.info();
console.log(info);

const nlp = spacy.load('en_core_web_lg');
const doc = nlp(`The Mars Orbiter Mission (MOM), informally known as Mangalyaan, was launched into Earth orbit on 5 November 2013 by the Indian Space Research Organisation (ISRO) and has entered Mars orbit on 24 September 2014. India thus became the first country to enter Mars orbit on its first attempt. It was completed at a record low cost of $74 million.`);

console.log('doc', doc);
