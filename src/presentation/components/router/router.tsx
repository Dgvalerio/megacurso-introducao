import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

type Factory = {
  MakeLogin: FC;
  MakeSignUp: FC;
};

const Router: FC<Factory> = ({ MakeLogin, MakeSignUp }) => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={MakeLogin} />
      <Route path="/signup" exact component={MakeSignUp} />
    </Switch>
  </BrowserRouter>
);

export default Router;
