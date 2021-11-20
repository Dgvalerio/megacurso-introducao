import React, { FC, useEffect, useState } from 'react';

import { SurveyModel } from '../../../domain/models';
import { LoadSurveyList } from '../../../domain/usecases/load-survey-list';
import { Footer, Header } from '../../components';
import { SurveyItem, SurveyItemEmpty } from './components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: FC<Props> = ({ loadSurveyList }) => {
  const [surveys, setSurveys] = useState<SurveyModel[]>([]);

  useEffect(() => {
    loadSurveyList.loadAll().then((response) => setSurveys(response));
  }, []);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          {surveys.length ? (
            surveys.map((survey) => (
              <SurveyItem key={survey.id} survey={survey} />
            ))
          ) : (
            <SurveyItemEmpty />
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
