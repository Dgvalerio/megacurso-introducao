import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login } from '../../pages';

import '../../styles/global.scss';

const Router: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Router;
