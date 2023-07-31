import Sentence from './Sentence.js';
import Token from './Token.js';

const Doc = Object.assign(String);

Object.defineProperty(Doc.prototype, 'sents', {
  get: function () {
    return this._sents;
  },
  set: function (values) {
    const _sents = values.map((sent: Record<string, string | number>) => {
      const _sent = new Sentence(sent.text);

      for (const key of Object.keys(sent)) {
        _sent[key] = sent[key];
      }

      return _sent;
    });

    this._sents = _sents;
  }
});


Object.defineProperty(Doc.prototype, 'tokens', {
  get: function () {
    return this._tokens;
  },
  set: function (values) {
    const _tokens = values.map((token: Record<string, string | number>) => {
      const _token = new Token(token.text);

      for (const key of Object.keys(token)) {
        _token[key] = token[key];
      }

      return _token;
    });

    this._tokens = _tokens;
  }
});

export default Doc;