import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from '../presentation/components';
import MakeLogin from './factories/pages/login/login-factory';
import MakeSignUp from './factories/pages/signup/sign-up-factory';

import '../presentation/styles/global.scss';

ReactDOM.render(
  <Router MakeLogin={MakeLogin} MakeSignUp={MakeSignUp} />,
  document.getElementById('main')
);
