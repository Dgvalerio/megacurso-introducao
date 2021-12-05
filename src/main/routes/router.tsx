import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from '../../presentation/components';
import { ApiContext } from '../../presentation/contexts';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '../adapters/current-account-adapter';
import {
  MakeLogin,
  MakeSignUp,
  MakeSurveyList,
  MakeSurveyResult,
} from '../factories/pages';

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
        <PrivateRoute path="/" exact component={MakeSurveyList} />
        <PrivateRoute path="/surveys/:id" exact component={MakeSurveyResult} />
      </Switch>
    </BrowserRouter>
  </ApiContext.Provider>
);

export default Router;
