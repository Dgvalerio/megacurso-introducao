import React, { FC } from 'react';

import { Spinner } from '../index';
import Styles from './loading-styles.scss';

const Loading: FC = () => (
  <div className={Styles.loadingWrap} data-testid="loading">
    <div className={Styles.loading}>
      <span>Aguarde...</span>
      <Spinner isNegative />
    </div>
  </div>
);

export default Loading;
