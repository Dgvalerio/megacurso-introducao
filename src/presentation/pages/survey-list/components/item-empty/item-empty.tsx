import React from 'react';

import Styles from './item-empty-styles.scss';

const ItemEmpty = () => (
  <>
    <li className={Styles.surveyItemEmpty} />
    <li className={Styles.surveyItemEmpty} />
    <li className={Styles.surveyItemEmpty} />
    <li className={Styles.surveyItemEmpty} />
  </>
);

export default ItemEmpty;
