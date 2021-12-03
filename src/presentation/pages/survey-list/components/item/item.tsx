import React, { FC } from 'react';

import { LoadSurveyList } from '../../../../../domain/usecases';
import { Calendar, Icon, IconName } from '../../../../components';
import Styles from './item-styles.scss';

type Props = {
  survey: LoadSurveyList.Model;
};

const Item: FC<Props> = ({ survey }) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown;

  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={iconName} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  );
};

export default Item;
