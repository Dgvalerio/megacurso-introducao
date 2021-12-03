import React, { FC, useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';

import { LoadSurveyResult } from '../../../domain/usecases';
import {
  Calendar,
  Footer,
  Header,
  Loading,
  Error as ErrorComponent,
} from '../../components';
import Styles from './survey-result-styles.scss';

type Props = {
  loadSurveyResult: LoadSurveyResult;
};

const SurveyResult: FC<Props> = ({ loadSurveyResult }) => {
  const [isLoading] = useState(false);
  const [error] = useState('');
  const [surveyResult] = useState<LoadSurveyResult.Model>(null);

  useEffect(() => {
    loadSurveyResult.load().then().catch();
  });

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap} data-testid="survey-result">
        {surveyResult && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>
                Qual é seu framework web favorito? Qual é seu framework web
                favorito? Qual é seu framework web favorito?
              </h2>
            </hgroup>
            <FlipMove className={Styles.answersList}>
              <li>
                <img
                  src="http://fordevs.herokuapp.com/static/img/logo-react.png"
                  alt="React Logo"
                />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img
                  src="http://fordevs.herokuapp.com/static/img/logo-react.png"
                  alt="React Logo"
                />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li>
                <img
                  src="http://fordevs.herokuapp.com/static/img/logo-react.png"
                  alt="React Logo"
                />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button type="button">Voltar</button>
          </>
        )}
        {isLoading && <Loading />}
        {error && <ErrorComponent error={error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
