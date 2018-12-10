import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import 'styles/index.scss';

import Layout from 'js/structure/layout';

ReactDOM.render(<Layout />, document.querySelector('.wexg-main'));

if (module.hot) module.hot.accept();
