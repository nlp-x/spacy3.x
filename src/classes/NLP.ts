import Doc from './Doc.js';
import * as Python from '../utilities/Python.js';

const NLP = function (model: string) {
  // if (!(this instanceof NLP)) return new NLP(model);

  const nlp = function(text: string) {
    const data = Python.spacy.nlp(text, model);

    const doc = new Doc(text);
    doc.sents = data.sents;
    doc.tokens = data.tokens;
    doc.ents = data.ents;

    return doc;
  }

  nlp.__proto__ = NLP.prototype;
  nlp.constructor = NLP;
  nlp.model = model;

  const data = Python.spacy.load(model);

  nlp.path = data.path;
  nlp.pipe_names = data.pipe_names;
  nlp.vocab = data.vocab;
  nlp.meta = data.meta;
  nlp.config = data.config;
  nlp.optimizer = data._optimizer;
  nlp.pipe_meta = data._pipe_meta;
  nlp.pipe_configs = data._pipe_configs;
  nlp.components = data.components;
  nlp.disabled = data.disabled;
  nlp.max_length = data.max_length;
  nlp.tokenizer = data.tokenizer;
  nlp.batch_size = data.batch_size;

  return nlp;
} as any as { new (model: string): any }

export default NLP;