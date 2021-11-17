import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ApiContext } from '../../presentation/contexts';
import { SurveyList } from '../../presentation/pages';
import { setCurrentAccountAdapter } from '../adapters/current-account-adapter';
import MakeLogin from '../factories/pages/login/login-factory';
import MakeSignUp from '../factories/pages/signup/sign-up-factory';

const Router: FC = () => (
  <ApiContext.Provider
    value={{
      setCurrentAccount: setCurrentAccountAdapter,
    }}
  >
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={MakeLogin} />
        <Route path="/signup" exact component={MakeSignUp} />
        <Route path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  </ApiContext.Provider>
);

export default Router;
