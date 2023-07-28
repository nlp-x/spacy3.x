import sys
import subprocess
import spacy
from spacy import displacy

def download_model():
  packages = [sys.argv[2]]

  for package_name in packages:
    if not spacy.util.is_package(package_name):
      subprocess.check_call([sys.executable, '-m', 'spacy', 'download', package_name, '--timeout=100000'])

def info():
  result = {}

  nlp = spacy.load(sys.argv[2])
  info = spacy.info()

  result['info'] = info
  result['model_path'] = nlp._path

  print(result)

def ner():
  nlp = spacy.load(sys.argv[2])

  entities = []

  raw_text = sys.argv[3]
  text= nlp(raw_text)

  for word in text.ents:
    result = {}

    result['text'] = word.text
    result['label'] = word.label_
    result['start_char'] = word.start_char
    result['end_char'] = word.end_char

    entities.append(result)

  print(entities)

if sys.argv[1] == 'info':
  info()

if sys.argv[1] == 'download_model':
  download_model()

if sys.argv[1] == 'ner':
  ner()

sys.stdout.flush()