import React, { FC } from 'react';

import { LoadSurveyList } from '../../../../../domain/usecases';
import { SurveyItem, SurveyItemEmpty } from '../index';
import Styles from './list-styles.scss';

type Props = {
  surveys: LoadSurveyList.Model[];
};

const List: FC<Props> = ({ surveys }) => (
  <ul className={Styles.listWrap} data-testid="survey-list">
    {surveys.length ? (
      surveys.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
    ) : (
      <SurveyItemEmpty />
    )}
  </ul>
);

export default List;
