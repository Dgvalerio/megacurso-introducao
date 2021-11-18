import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from '../../presentation/components';
import { ApiContext } from '../../presentation/contexts';
import { SurveyList } from '../../presentation/pages';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '../adapters/current-account-adapter';
import MakeLogin from '../factories/pages/login/login-factory';
import MakeSignUp from '../factories/pages/signup/sign-up-factory';

const Router: FC = () => (
  <ApiContext.Provider
    value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter,
    }}
  >
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={MakeLogin} />
        <Route path="/signup" exact component={MakeSignUp} />
        <PrivateRoute path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  </ApiContext.Provider>
);

export default Router;
