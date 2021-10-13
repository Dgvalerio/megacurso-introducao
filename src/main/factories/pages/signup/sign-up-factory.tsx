import React, { FC } from 'react';

import { SignUp } from '../../../../presentation/pages';
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory';
import { makeLocalUpdateCurrentAccount } from '../../usecases/update-current-account/update-current-account-factory';
import { makeSignUpValidation } from './signup-validation-factory';

const MakeSignUp: FC = () => (
  <SignUp
    validation={makeSignUpValidation()}
    addAccount={makeRemoteAddAccount()}
    updateCurrentAccount={makeLocalUpdateCurrentAccount()}
  />
);

export default MakeSignUp;
