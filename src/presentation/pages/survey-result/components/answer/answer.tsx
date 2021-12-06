import React, { FC, useContext } from 'react';

import { SurveyResultAnswerModel } from '../../../../../domain/models';
import { SurveyResultContext } from '../index';
import Styles from './answer-styles.scss';

type Props = {
  answer: SurveyResultAnswerModel;
};

const Answer: FC<Props> = ({ answer }) => {
  const { onAnswer } = useContext(SurveyResultContext);

  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : '';

  const answerClick = (event: React.MouseEvent): void => {
    if (event.currentTarget.classList.contains(Styles.active)) return;
    onAnswer(answer.answer);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <li
      data-testid="answer-wrap"
      className={[Styles.answerWrap, activeClassName].join(' ')}
      onClick={answerClick}
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
  );
};

export default Answer;
