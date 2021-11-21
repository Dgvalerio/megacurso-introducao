import { createContext } from 'react';

import { LoadSurveyList } from '../../../../../domain/usecases/load-survey-list';

type Props = {
  surveys: [
    surveys: LoadSurveyList.Model[],
    setSurveys: (survey: LoadSurveyList.Model[]) => void
  ];
  reload: [reload: boolean, setReload: (value: boolean) => void];
  error: [error: string, setError: (message: string) => void];
};

export default createContext<Props>(null);
