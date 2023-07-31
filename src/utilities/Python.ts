import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const spacy = {
  info () {
    const process = spawnSync('python3', [ `${__dirname}/spaCy.py`, 'info' ]);
    const result = process.stdout?.toString()?.trim();

    const data = result.replaceAll('\'', '\"');

    return JSON.parse(data);
  },
  installDependencies () {
    spawnSync('pip3', ['install', '-U', 'pip', 'setuptools', 'wheel']);
    spawnSync('pip3', ['install', '-U', 'spacy']);
  },
  download (model: string) {
    spawnSync('python3', [ `${__dirname}/spaCy.py`, 'download_model', model ], {
      stdio: 'inherit',
      shell: true,
    });
  },
  load (model: string): Record<string, unknown> {
    const process = spawnSync('python3', [ `${__dirname}/spaCy.py`, 'load', model ]);
    const result = process.stdout?.toString()?.trim();
    const data = JSON.parse(result);

    const matches = data._pipe_meta.match(/FactoryMeta\(([^)]+)\}\)/gm);

    for (const item of matches) {
      const oldTerm = item;
      const newTerm = item
        .replace(/^FactoryMeta\(/, '')
        .replace(/\)$/, '')
        .replace(/factory\=/, '')
        .replace(/default_config\=/g, '\'default_config\':')
        .replace(/assigns\=/g, '\'assigns\':')
        .replace(/requires\=/g, '\'requires\':')
        .replace(/retokenizes\=/g, '\'retokenizes\':')
        .replace(/scores\=/g, '\'scores\':')
        .replace(/default_score_weights\=/g, '\'default_score_weights\':')
        .replace(/@architectures/g, 'architectures')
        .replace(/@scorers/g, 'scorers');

      data._pipe_meta = data._pipe_meta.replace(oldTerm, newTerm);
    }

    data._pipe_meta = data._pipe_meta
      .replaceAll('PosixPath(\'', '\"')
      .replaceAll('=\'', '=\\\'')
      .replaceAll('\')', '\"')
      .replaceAll('\'', '\"')
      .replaceAll('None', 'null')
      .replaceAll('True', 'true')
      .replaceAll('False', 'false')
      .replaceAll('""""', '"\'\'"')
      .replaceAll('("', '"')
      .replaceAll('),', ',')
      .replace(/<spacy(.\w*){3,6} object at \w*>[),]/g, '')
      .replace(/,\s*]/g, ']')
      .replaceAll('>)', '>')
      .replaceAll('>,', '",')
      .replaceAll(', <', ', "')
      .replaceAll(': <', ': "')
      .replaceAll('>]', '"]')
      .replaceAll('>}', '"}');

    data._pipe_meta = JSON.parse(data._pipe_meta);

    return data;
  },
  nlp (text: string, model: string): Record<string, unknown> {
    const process = spawnSync('python3', [ `${__dirname}/spaCy.py`, 'nlp', text, model ]);
    const result = process.stdout?.toString()?.trim();

    return JSON.parse(result);
  }
}

export const pip3 = {
  list () {
    const pythonProcess = spawnSync('pip3', ['list']);
    const result = pythonProcess.stdout?.toString()?.trim();

    const pipList = result.split('\n').slice(2);
  
    return pipList.map((item) => item.split(' ')[0]);
  }
}
