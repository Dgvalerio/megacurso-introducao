import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { SurveyResult } from '../../../../presentation/pages';
import {
  makeRemoteLoadSurveyResult,
  makeRemoteSaveSurveyResult,
} from '../../usecases';

export const MakeSurveyResult: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
    />
  );
};
