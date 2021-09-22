import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Router } from '../presentation/components';
import MakeLogin from './factories/pages/login/login-factory';

import '../presentation/styles/global.scss';

ReactDOM.render(
  <Router MakeLogin={MakeLogin} />,
  document.getElementById('main')
);
