import React, { FC } from 'react';

import { SurveyList } from '../../../../presentation/pages';
import { makeRemoteLoadSurveyList } from '../../usecases';

export const MakeSurveyList: FC = () => (
  <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />
);
