import { createContext } from 'react';

import { SurveyModel } from '../../../../../domain/models';

type Props = {
  surveys: [
    surveys: SurveyModel[],
    setSurveys: (survey: SurveyModel[]) => void
  ];
  reload: [reload: boolean, setReload: (value: boolean) => void];
  error: [error: string, setError: (message: string) => void];
};

export default createContext<Props>(null);
