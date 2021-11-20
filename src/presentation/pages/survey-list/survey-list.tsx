import React, { FC } from 'react';

import { Footer, Header } from '../../components';
import { SurveyItemEmpty } from './components';
import Styles from './survey-list-styles.scss';

const SurveyList: FC = () => (
  <div className={Styles.surveyListWrap}>
    <Header />
    <div className={Styles.contentWrap}>
      <h2>Enquetes</h2>
      <ul data-testid="survey-list">
        <SurveyItemEmpty />
      </ul>
    </div>
    <Footer />
  </div>
);

export default SurveyList;
