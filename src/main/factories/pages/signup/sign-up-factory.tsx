import React, { FC } from 'react';

import { SignUp } from '../../../../presentation/pages';
import { makeRemoteAddAccount } from '../../usecases';
import { makeSignUpValidation } from './signup-validation-factory';

export const MakeSignUp: FC = () => (
  <SignUp
    validation={makeSignUpValidation()}
    addAccount={makeRemoteAddAccount()}
  />
);
