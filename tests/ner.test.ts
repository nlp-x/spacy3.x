import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { describe, it, expect, vi } from 'vitest';
import spacy from '../src/index';
import * as Python from '../src/utilities/Python';

import SENTENCES from './sentences.json'  assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe(('Spacy Info'), () => {
  it('should have properties', () => {
    const info = spacy.info();

    expect(info).toHaveProperty('spacy_version');
    expect(info).toHaveProperty('location');
    expect(info).toHaveProperty('platform');
    expect(info).toHaveProperty('python_version');
    expect(info).toHaveProperty('pipelines');
  });

  it('should install dependencies when not exist', () => {
    spawnSync('pip3', ['uninstall', 'spacy', '-y']);

    const installDependenciesSpy = vi.spyOn(Python.spacy, 'installDependencies')

    spacy.info();

    expect(installDependenciesSpy).toHaveBeenCalled()
  });
});

describe(('Spacy NLP'), () => {
  it('should have properties', () => {
    const nlp = spacy.load('en_core_web_lg');

    expect(nlp).toHaveProperty('pipe_names');
    expect(nlp).toHaveProperty('path');
    expect(nlp).toHaveProperty('vocab');
    expect(nlp).toHaveProperty('meta');
    expect(nlp).toHaveProperty('config');
    expect(nlp).toHaveProperty('optimizer');
    expect(nlp).toHaveProperty('pipe_meta');
    expect(nlp).toHaveProperty('pipe_configs');
    expect(nlp).toHaveProperty('components');
    expect(nlp).toHaveProperty('disabled');
    expect(nlp).toHaveProperty('max_length');
    expect(nlp).toHaveProperty('tokenizer');
    expect(nlp).toHaveProperty('batch_size');
  });

  it('should return info with local package path', () => {
    const localModel = `${__dirname}/en_core_web_sm-3.6.0`;
    const nlp = spacy.load(localModel);

    expect(nlp.model).toEqual(localModel);
  });

  it('should load "en_core_web_sm" package when is unknown', () => {
    const nlp = spacy.load('xyz');

    expect(nlp.model).toEqual('en_core_web_sm');
  });

  it('should load "en_core_web_sm" package by default', () => {
    const nlp = spacy.load();

    expect(nlp.model).toEqual('en_core_web_sm');
  });

  it('should fallback to "en_core_web_sm" when local package doesn\'t exist', () => {
    const localModel = `${__dirname}/en_core_web_lg-3.6.x`;
    const nlp = spacy.load(localModel);

    expect(nlp.model).toEqual('en_core_web_sm');
  });
});

describe(('Sentences'), () => {
  it('should split the text into three sentences', () => {
    const nlp = spacy.load(SENTENCES[0].model);
    const doc = nlp(SENTENCES[0].text);

    expect(doc.sents.length).toBe(3);

    expect(doc.sents[0].start).toBe(0);
    expect(doc.sents[0].end).toBe(41);
  });

  it('should split the sentences into tokens', () => {
    const nlp = spacy.load(SENTENCES[0].model);
    const doc = nlp(SENTENCES[0].text);

    expect(String(doc.sents[1].tokens[0])).toBe('India');
    expect(doc.sents[1].tokens[0].text).toBe('India');
    expect(doc.sents[1].tokens[0].tag).toBe('NNP');
    expect(doc.sents[1].tokens[0].lemma).toBe('India');
    expect(doc.sents[1].tokens[0].ent_type).toBe('GPE');
  });
});

describe(('Tokens'), () => {
  it('should split the text into tokens', () => {
    const nlp = spacy.load(SENTENCES[0].model);
    const doc = nlp(SENTENCES[0].text);

    expect(doc.tokens.length).toBe(69);
    expect(String(doc.tokens[0])).toBe('The');
    expect(doc.tokens[0].text).toBe('The');
    expect(doc.tokens[0].tag).toBe('DT');
    expect(doc.tokens[0].lemma).toBe('the');
  });
});

describe(('Named Entity Recognition (NER)'), () => {
  it('should identify entities', () => {
    const nlp = spacy.load(SENTENCES[0].model);
    const doc = nlp(SENTENCES[0].text);

    expect(doc.ents[3].text).toBe('5 November 2013');
    expect(doc.ents[3].label).toBe('DATE');

    expect(doc.ents[8].text).toBe('India');
    expect(doc.ents[8].label).toBe('GPE');
  });
});
