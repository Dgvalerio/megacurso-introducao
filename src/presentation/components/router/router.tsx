import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

type Props = {
  MakeLogin: React.FC;
};

const Router: FC<Props> = ({ MakeLogin }) => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={MakeLogin} />
    </Switch>
  </BrowserRouter>
);

export default Router;
