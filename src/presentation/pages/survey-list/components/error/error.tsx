import React, { FC, useContext } from 'react';

import { SurveyContext } from '../index';
import Styles from './error-styles.scss';

const Error: FC = () => {
  const {
    surveys: [, setSurveys],
    error: [error, setError],
    reload: [reload, setReload],
  } = useContext(SurveyContext);

  const reLoad = () => {
    setSurveys([]);
    setError('');
    setReload(!reload);
  };

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{error}</span>
      <button data-testid="reload" type="button" onClick={reLoad}>
        Tentar novamente
      </button>
    </div>
  );
};

export default Error;
