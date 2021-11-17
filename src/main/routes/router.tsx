import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { SurveyList } from '../../presentation/pages';
import MakeLogin from '../factories/pages/login/login-factory';
import MakeSignUp from '../factories/pages/signup/sign-up-factory';

const Router: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={MakeLogin} />
      <Route path="/signup" exact component={MakeSignUp} />
      <Route path="/" exact component={SurveyList} />
    </Switch>
  </BrowserRouter>
);

export default Router;
