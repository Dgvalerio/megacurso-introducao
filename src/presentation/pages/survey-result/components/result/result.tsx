import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { LoadSurveyResult } from '../../../../../domain/usecases';
import { Calendar } from '../../../../components';
import { SurveyResultAnswer } from '../index';
import Styles from './result-styles.scss';

type Props = {
  surveyResult: LoadSurveyResult.Model;
};

const Result: FC<Props> = ({ surveyResult }) => {
  const { goBack } = useHistory();

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      {surveyResult.answers.map((answer) => (
        <SurveyResultAnswer answer={answer} key={answer.answer} />
      ))}
      <button
        className={Styles.button}
        type="button"
        data-testid="back-button"
        onClick={goBack}
      >
        Voltar
      </button>
    </>
  );
};

export default Result;
