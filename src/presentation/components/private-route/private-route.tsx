import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const PrivateRoute: FC<RouteProps> = (props) => (
  <Route {...props} component={() => <Redirect to="/login" />} />
);

export default PrivateRoute;
