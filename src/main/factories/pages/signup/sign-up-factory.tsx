import React, { FC } from 'react';

import { SignUp } from '../../../../presentation/pages';
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory';
import { makeLocalSaveAccessToken } from '../../usecases/save-access-token/save-access-token-factory';
import { makeSignUpValidation } from './signup-validation-factory';

const MakeSignUp: FC = () => (
  <SignUp
    validation={makeSignUpValidation()}
    addAccount={makeRemoteAddAccount()}
    saveAccessToken={makeLocalSaveAccessToken()}
  />
);

export default MakeSignUp;
