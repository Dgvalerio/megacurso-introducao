import React, { FC, useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { ApiContext } from '../../contexts';

const PrivateRoute: FC<RouteProps> = (props) => {
  const { getCurrentAccount } = useContext(ApiContext);

  return getCurrentAccount()?.accessToken ? (
    <Route {...props} />
  ) : (
    <Route {...props} component={() => <Redirect to="/login" />} />
  );
};

export default PrivateRoute;
