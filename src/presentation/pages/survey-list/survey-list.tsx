import React, { FC, useEffect } from 'react';

import { LoadSurveyList } from '../../../domain/usecases/load-survey-list';
import { Footer, Header } from '../../components';
import { SurveyItemEmpty } from './components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: FC<Props> = ({ loadSurveyList }) => {
  useEffect(() => {
    (async () => {
      await loadSurveyList.loadAll();
    })();
  }, []);

  return (
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
};

export default SurveyList;
