import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { SignUp } from '../../pages';

type Props = {
  MakeLogin: React.FC;
};

const Router: FC<Props> = ({ MakeLogin }) => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={MakeLogin} />
      <Route path="/signup" exact component={SignUp} />
    </Switch>
  </BrowserRouter>
);

export default Router;
