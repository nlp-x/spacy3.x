import fs from 'node:fs';
import models from './models.js';

import NLP from './classes/NLP.js';
import * as Python from './utilities/Python.js';

/*
 * Spacy Models
 * Release: https://github.com/explosion/spacy-models/releases
 */

const Spacy = {
  load (model?: string)  {
    let localModel = false;

    if (model && fs.existsSync(model)) {
      localModel = true;
    } else if (model) {
      model = models.includes(model) ? model: 'en_core_web_sm';
    } else {
      model = 'en_core_web_sm';
    }

    Spacy.installDependencies();

    if (!localModel) {
      Python.spacy.download(model);
    };

    return new NLP(model);
  },
  installDependencies () {
    const pipList = Python.pip3.list();

    const hasPip = pipList?.includes('pip');
    const hasSetuptools = pipList?.includes('setuptools');
    const hasWheel = pipList?.includes('wheel');
    const hasSpacy = pipList?.includes('spacy');

    if (!hasPip || !hasSetuptools || !hasWheel || !hasSpacy) {
      Python.spacy.installDependencies();
    }
  },
  info () {
    Spacy.installDependencies();

    return Python.spacy.info();
  }
}

export default Spacy;
