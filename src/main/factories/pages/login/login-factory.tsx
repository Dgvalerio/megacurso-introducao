import React, { FC } from 'react';

import { Login } from '../../../../presentation/pages';
import { makeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-factory';
import { makeLoginValidation } from './login-validation-factory';

const MakeLogin: FC = () => (
  <Login
    validation={makeLoginValidation()}
    authentication={makeRemoteAuthentication()}
  />
);

export default MakeLogin;
