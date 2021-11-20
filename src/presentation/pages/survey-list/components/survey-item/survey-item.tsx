import React from 'react';

import { Icon, IconName } from '../../../../components';
import Styles from './survey-item-styles.scss';

const SurveyItem = () => (
  <li className={Styles.surveyItemWrap}>
    <div className={Styles.surveyContent}>
      <Icon className={Styles.iconWrap} iconName={IconName.thumbUp} />
      <time>
        <span className={Styles.day}>22</span>
        <span className={Styles.month}>03</span>
        <span className={Styles.year}>2020</span>
      </time>
      <p>Qual é seu framework web favorito?</p>
    </div>
    <footer>Ver Resultado</footer>
  </li>
);

export default SurveyItem;
