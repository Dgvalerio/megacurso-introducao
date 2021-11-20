import React, { FC } from 'react';

import { Login } from '../../../../presentation/pages';
import { makeRemoteAuthentication } from '../../usecases';
import { makeLoginValidation } from './login-validation-factory';

export const MakeLogin: FC = () => (
  <Login
    validation={makeLoginValidation()}
    authentication={makeRemoteAuthentication()}
  />
);
