import React, { FC } from 'react';
import FlipMove from 'react-flip-move';
import { useHistory } from 'react-router-dom';

import { LoadSurveyResult } from '../../../../../domain/usecases';
import { Calendar } from '../../../../components';
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
      <FlipMove className={Styles.answersList} data-testid="answers">
        {surveyResult.answers.map((answer) => (
          <li
            key={answer.answer}
            data-testid="answer-wrap"
            className={answer.isCurrentAccountAnswer ? Styles.active : ''}
          >
            {answer.image && (
              <img data-testid="image" src={answer.image} alt={answer.answer} />
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
