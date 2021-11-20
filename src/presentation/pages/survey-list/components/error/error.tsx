import React, { FC, useContext } from 'react';

import { SurveyContext } from '../index';
import Styles from './error-styles.scss';

const Error: FC = () => {
  const {
    error: [error],
  } = useContext(SurveyContext);

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{error}</span>
      <button type="button">Recarregar</button>
    </div>
  );
};

export default Error;
