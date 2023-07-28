import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { describe, it, expect } from 'vitest';
import Spacy from '../src/index';
import NER from './ner.json'  assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe(('EntityRecognizer'), () => {
  it('should identify entities', () => {
    const spacy = new Spacy({ model: NER[0].model });
    const { data, error } = spacy.ner(NER[0].text);

    spacy.info();

    expect(data).toEqual(NER[0].result);
    expect(error).toBeNull();
  });

  it('should load "en_core_web_sm" package by default', () => {
    const spacy = new Spacy({ model: undefined });

    expect(spacy.model).toEqual('en_core_web_sm');
  });

  it('should load "en_core_web_sm" package when is unknown', () => {
    const spacy = new Spacy({ model: 'xyz' });

    expect(spacy.model).toEqual('en_core_web_sm');
  });

  it('should load local "en_core_web_sm-3.6.0" package', () => {
    const localModel = `${__dirname}/en_core_web_sm-3.6.0`;

    const spacy = new Spacy({ model: localModel });
    const { data, error } = spacy.ner(NER[1].text);
    
    expect(spacy.model).toEqual(localModel);
    expect(data).toEqual(NER[1].result);
    expect(error).toBeNull();
  });

  it('should fallback to "en_core_web_sm" when local package doesn\'t exist', () => {
    const localModel = `${__dirname}/en_core_web_lg-3.6.1`;

    const spacy = new Spacy({ model: localModel });
    expect(spacy.model).toEqual('en_core_web_sm');
  });

  it('should return info with local package path', () => {
    const localModel = `${__dirname}/en_core_web_sm-3.6.0`;

    const spacy = new Spacy({ model: localModel });
    const { data, error } = spacy.info();

    expect(data.model_path).toEqual(localModel);
    expect(data).toHaveProperty('model_path');
    expect(data).toHaveProperty('spacy_version');
    expect(data).toHaveProperty('location');
    expect(data).toHaveProperty('platform');
    expect(data).toHaveProperty('python_version');
    expect(data).toHaveProperty('pipelines');
    expect(error).toBeNull();
  });

  it('should install dependencies when not exist', () => {
    spawnSync('pip3', ['uninstall', 'spacy', '-y']);

    const spacy = new Spacy({});
    const { data, error } = spacy.ner(NER[1].text);
    
    expect(spacy.model).toEqual('en_core_web_sm');
    expect(data).toEqual(NER[1].result);
    expect(error).toBeNull();
  });
});


