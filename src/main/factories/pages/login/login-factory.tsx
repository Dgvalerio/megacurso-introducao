import React, { FC } from 'react';

import { Login } from '../../../../presentation/pages';
import { makeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-factory';
import { makeLocalSaveAccessToken } from '../../usecases/save-access-token/save-access-token-factory';
import { makeLoginValidation } from './login-validation-factory';

const MakeLogin: FC = () => (
  <Login
    validation={makeLoginValidation()}
    authentication={makeRemoteAuthentication()}
    saveAccessToken={makeLocalSaveAccessToken()}
  />
);

export default MakeLogin;
