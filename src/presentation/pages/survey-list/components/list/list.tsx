import React, { FC, useContext } from 'react';

import { SurveyContext, SurveyItem, SurveyItemEmpty } from '../index';
import Styles from './list-styles.scss';

const List: FC = () => {
  const {
    surveys: [surveys],
  } = useContext(SurveyContext);

  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {surveys.length ? (
        surveys.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  );
};

export default List;
