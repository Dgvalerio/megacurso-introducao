import React, { FC, useContext } from 'react';

import Context from '../../contexts/form/form-context';
import Spinner from '../spinner/spinner';
import Styles from './form-status-styles.scss';

const FormStatus: FC = () => {
  const {
    state: { isLoading },
    errorState: { main: errorMessage },
  } = useContext(Context);

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  );
};

export default FormStatus;
