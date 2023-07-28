# spaCy3.x

## Prerequisites

- Python3
- pip3

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


## Local packages

https://github.com/explosion/spacy-models/releases/tag/en_core_web_md-3.6.0


```
MODEL_NAME=en_core_web_sm
MODEL_VERSION=3.6.0

curl --location --remote-header-name --remote-name https://github.com/explosion/spacy-models/releases/download/${MODEL_NAME}-${MODEL_VERSION}/${MODEL_NAME}-${MODEL_VERSION}-py3-none-any.whl

wheel unpack ${MODEL_NAME}-${MODEL_VERSION}-py3-none-any.whl
cp -r ${MODEL_NAME}-${MODEL_VERSION}/${MODEL_NAME}/${MODEL_NAME}-${MODEL_VERSION} tests
rm -r ${MODEL_NAME}-${MODEL_VERSION}
rm ${MODEL_NAME}-${MODEL_VERSION}-py3-none-any.whl
```