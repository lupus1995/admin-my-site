import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

/**
 * render заново перерисовывает html дерево, в отличии от hidrate, в связи с этим в режиме разработки было принято решение отказаться от использования ssr
 */
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root'),
);
