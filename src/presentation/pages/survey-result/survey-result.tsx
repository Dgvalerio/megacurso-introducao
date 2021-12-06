import React, { FC, useEffect, useState } from 'react';

import { LoadSurveyResult } from '../../../domain/usecases';
import {
  Footer,
  Header,
  Loading,
  Error as ErrorComponent,
} from '../../components';
import { useErrorHandler } from '../../hooks';
import { SurveyResultData } from './components';
import Styles from './survey-result-styles.scss';

type Props = {
  loadSurveyResult: LoadSurveyResult;
};

const SurveyResult: FC<Props> = ({ loadSurveyResult }) => {
  const [isLoading] = useState(false);
  const [error, setError] = useState('');
  const [surveyResult, setSurveyResult] =
    useState<LoadSurveyResult.Model>(null);
  const [reload, setReload] = useState(false);

  const handleError = useErrorHandler((e: Error) => {
    setSurveyResult(null);
    setError(e.message);
  });

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((survey) => setSurveyResult(survey))
      .catch(handleError);
  }, [reload]);

  const reloadHandler = () => {
    setSurveyResult(null);
    setError('');
    setReload((prev) => !prev);
  };

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap} data-testid="survey-result">
        {surveyResult && <SurveyResultData surveyResult={surveyResult} />}
        {isLoading && <Loading />}
        {error && <ErrorComponent error={error} reload={reloadHandler} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
