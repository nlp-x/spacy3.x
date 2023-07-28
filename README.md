# spacy3.x

[![NPM](https://badge.fury.io/js/@nlp-x%2Fspacy3.x.svg)](https://nodei.co/npm/@nlp-x/spacy3.x/)
[![CI](https://github.com/nlp-x/spacy3.x/actions/workflows/ci.yaml/badge.svg)](https://github.com/nlp-x/spacy3.x/actions/workflows/ci.yaml)
[![Issues](https://img.shields.io/github/issues/nlp-x/spacy3.x.svg)](https://github.com/nlp-x/spacy3.x/issues)
[![Forks](https://img.shields.io/github/forks/nlp-x/spacy3.x.svg)](https://github.com/nlp-x/spacy3.x/network)
[![Stars](https://img.shields.io/github/stars/nlp-x/spacy3.x.svg)](https://github.com/nlp-x/spacy3.x/stargazers)
[![License](https://img.shields.io/github/license/nlp-x/spacy3.x.svg)](https://raw.githubusercontent.com/nlp-x/spacy3.x/main/LICENSE)

JavaScript library for accessing linguistic annotations provided by spaCy v.3.x.


## Prerequisites

- Node.js
- NPM
- Python3
- pip3

## Installation

NPM:
```
npm install @nlp-x/spacy3.x
```

Yarn:
```
yarn add @nlp-x/spacy3.x
```

PNPM:
```
pnpm install @nlp-x/spacy3.x
```


## Usage

```js
import Spacy from '@nlp-x/spacy3.x';

const spacy = new Spacy({
  model: 'en_core_web_sm'
})

const info = spacy.info();
console.log('info', info)

const { data, error } = spacy.ner('The Mars Orbiter Mission (MOM), informally known as Mangalyaan, was launched into Earth orbit on 5 November 2013 by the Indian Space Research Organisation (ISRO) and has entered Mars orbit on 24 September 2014. India thus became the first country to enter Mars orbit on its first attempt. It was completed at a record low cost of $74 million.');
console.log('data', data);
console.log('error', error);
```

## Tests

```
yarn test
```


## Download models

https://github.com/explosion/spacy-models/releases/tag/en_core_web_sm-3.6.0


```
MODEL_NAME=en_core_web_sm
MODEL_VERSION=3.6.0

curl --location --remote-header-name --remote-name https://github.com/explosion/spacy-models/releases/download/${MODEL_NAME}-${MODEL_VERSION}/${MODEL_NAME}-${MODEL_VERSION}-py3-none-any.whl

wheel unpack ${MODEL_NAME}-${MODEL_VERSION}-py3-none-any.whl
cp -r ${MODEL_NAME}-${MODEL_VERSION}/${MODEL_NAME}/${MODEL_NAME}-${MODEL_VERSION} tests
rm -r ${MODEL_NAME}-${MODEL_VERSION}
rm ${MODEL_NAME}-${MODEL_VERSION}-py3-none-any.whl
```