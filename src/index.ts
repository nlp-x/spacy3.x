import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import models from './models.js';

import type { SpacyConfig } from './types.d.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://github.com/explosion/spacy-models/releases

export default class Spacy {
  model: string;
  models = models;
  localModel = false;

  constructor (config: SpacyConfig) {
    if (config?.model && fs.existsSync(config?.model)) {
      this.model = config.model;
      this.localModel = true;
    } else if (config?.model) {
      this.model = this.models.includes(config.model) ? config.model: 'en_core_web_sm';
    } else {
      this.model = 'en_core_web_sm';
    }

    const pythonProcess = spawnSync('pip3', ['list']);

    const result = pythonProcess.stdout?.toString()?.trim();
    const error = pythonProcess.stderr?.toString()?.trim();

    const hasPip = result?.includes('pip ');
    const hasSetuptools = result?.includes('setuptools ');
    const hasWheel = result?.includes('wheel ');
    const hasSpacy = result?.includes('spacy ');

    if (!hasPip || !hasSetuptools || !hasWheel || !hasSpacy) {
      spawnSync('pip3', ['install', '-U', 'pip', 'setuptools', 'wheel']);
      spawnSync('pip3', ['install', '-U', 'spacy']);
    }

    if (this.localModel) return;

    spawnSync('python3', [
      `${__dirname}/spaCy.py`,
      'download_model',
      this.model
    ], {
      stdio: 'inherit',
      shell: true,
    });
  }

  info () {
    const pythonProcess = spawnSync('python3', [
      `${__dirname}/spaCy.py`,
      'info',
      this.model,
    ]);

    const result = pythonProcess.stdout?.toString()?.trim();
    const error = pythonProcess.stderr?.toString()?.trim();

    const sanitizedResult = result
      .replaceAll('PosixPath(\'', '\"')
      .replaceAll('\')', '\"')
      .replaceAll('\'', '\"');

    let data = JSON.parse(sanitizedResult);
    data = {
      ...data,
      ...data.info
    }

    delete data.info;

    return {
      data: data,
      error: error || null
    }
  }

  ner (text: string) {
    const pythonProcess = spawnSync('python3', [
      `${__dirname}/spaCy.py`,
      'ner',
      this.model,
      text
    ]);

    const result = pythonProcess.stdout?.toString()?.trim();
    const error = pythonProcess.stderr?.toString()?.trim();

    const data = result
      .replaceAll('\'text\': \'', '\"text\": \"')
      .replaceAll('\'label\': \'', '\"label\": \"')
      .replaceAll('\'start_char\':', '\"start_char\":')
      .replaceAll('\'end_char\':', '\"end_char\":')
      .replaceAll('\',', '\",')
      .replaceAll('\'}', '\"}')
      .trim()

    return {
      data: JSON.parse(data),
      error: error || null
    }
  }
}