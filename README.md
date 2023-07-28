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

### NER - Named-entity recognition

```js
import Spacy from '@nlp-x/spacy3.x';

const spacy = new Spacy({
  model: 'en_core_web_lg'
})

const { data, error } = spacy.ner('The Mars Orbiter Mission (MOM), informally known as Mangalyaan, was launched into Earth orbit on 5 November 2013 by the Indian Space Research Organisation (ISRO) and has entered Mars orbit on 24 September 2014. India thus became the first country to enter Mars orbit on its first attempt. It was completed at a record low cost of $74 million.');
console.log('data', data);
console.log('error', error);
```

Output:
```shell
[
  { text: 'The Mars Orbiter Mission', label: 'PRODUCT', start_char: 0, end_char: 24 },
  { text: 'Mangalyaan', label: 'PERSON', start_char: 52, end_char: 62 },
  { text: 'Earth', label: 'LOC', start_char: 82, end_char: 87 },
  { text: '5 November 2013', label: 'DATE', start_char: 97, end_char: 112 },
  { text: 'the Indian Space Research Organisation', label: 'ORG', start_char: 116, end_char: 154 },
  { text: 'ISRO', label: 'ORG', start_char: 156, end_char: 160 },
  { text: 'Mars', label: 'LOC', start_char: 178, end_char: 182 },
  { text: '24 September 2014', label: 'DATE', start_char: 192, end_char: 209 },
  { text: 'India', label: 'GPE', start_char: 211, end_char: 216 },
  { text: 'first', label: 'ORDINAL', start_char: 233, end_char: 238 },
  { text: 'Mars', label: 'LOC', start_char: 256, end_char: 260 },
  { text: 'first', label: 'ORDINAL', start_char: 274, end_char: 279 },
  { text: '$74 million', label: 'MONEY', start_char: 330, end_char: 341 }
]
```



### Info
```js
import Spacy from '@nlp-x/spacy3.x';

const spacy = new Spacy({
  model: 'en_core_web_lg'
})

const info = spacy.info();
console.log('info', info)
```

Output:
```shell
{
  data: {
    model_path: '/usr/local/lib/python3.11/site-packages/en_core_web_lg/en_core_web_lg-3.6.0',
    spacy_version: '3.6.0',
    location: '/usr/local/lib/python3.11/site-packages/spacy',
    platform: 'macOS-13.4-x86_64-i386-64bit',
    python_version: '3.11.4',
    pipelines: { en_core_web_lg: '3.6.0', en_core_web_sm: '3.6.0' }
  },
  error: null
}
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