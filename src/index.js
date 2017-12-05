import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YandexTranslate from 'yandex-translate';

import apiKey from './api-key';

console.log(apiKey);

const yandexInstance = YandexTranslate(apiKey);
console.log(yandexInstance);

yandexInstance.translate('You can burn my house, steal my car, drink my liquor from an old fruitjar.', { to: 'fi' }, function(err, res) {
  console.log(res.text);
});

function App () {
  return (
    <div>
      <h1>moimoi</h1>
      <p>COOL div</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
