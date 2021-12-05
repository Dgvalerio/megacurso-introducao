import React, { FC, useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import { useHistory } from 'react-router-dom';

import { LoadSurveyResult } from '../../../domain/usecases';
import {
  Calendar,
  Footer,
  Header,
  Loading,
  Error as ErrorComponent,
} from '../../components';
import { useErrorHandler } from '../../hooks';
import Styles from './survey-result-styles.scss';

type Props = {
  loadSurveyResult: LoadSurveyResult;
};

const SurveyResult: FC<Props> = ({ loadSurveyResult }) => {
  const [isLoading] = useState(false);
  const [error, setError] = useState('');
  const [surveyResult, setSurveyResult] =
    useState<LoadSurveyResult.Model>(null);
  const [reload, setReload] = useState(false);
  const { goBack } = useHistory();

  const handleError = useErrorHandler((e: Error) => {
    setSurveyResult(null);
    setError(e.message);
  });

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((survey) => setSurveyResult(survey))
      .catch(handleError);
  }, [reload]);

  const reloadHandler = () => {
    setSurveyResult(null);
    setError('');
    setReload((prev) => !prev);
  };

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap} data-testid="survey-result">
        {surveyResult && (
          <>
            <hgroup>
              <Calendar
                date={surveyResult.date}
                className={Styles.calendarWrap}
              />
              <h2 data-testid="question">{surveyResult.question}</h2>
            </hgroup>
            <FlipMove className={Styles.answersList} data-testid="answers">
              {surveyResult.answers.map((answer) => (
                <li
                  key={answer.answer}
                  data-testid="answer-wrap"
                  className={answer.isCurrentAccountAnswer ? Styles.active : ''}
                >
                  {answer.image && (
                    <img
                      data-testid="image"
                      src={answer.image}
                      alt={answer.answer}
                    />
                  )}
                  <span data-testid="answer" className={Styles.answer}>
                    {answer.answer}
                  </span>
                  <span data-testid="percent" className={Styles.percent}>
                    {answer.percent}%
                  </span>
                </li>
              ))}
            </FlipMove>
            <button type="button" data-testid="back-button" onClick={goBack}>
              Voltar
            </button>
          </>
        )}
        {isLoading && <Loading />}
        {error && <ErrorComponent error={error} reload={reloadHandler} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
