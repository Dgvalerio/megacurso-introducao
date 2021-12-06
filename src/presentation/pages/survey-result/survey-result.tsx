import React, { FC, useEffect, useState } from 'react';

import { LoadSurveyResult, SaveSurveyResult } from '../../../domain/usecases';
import {
  Footer,
  Header,
  Loading,
  Error as ErrorComponent,
} from '../../components';
import { useErrorHandler } from '../../hooks';
import { SurveyResultContext, SurveyResultData } from './components';
import Styles from './survey-result-styles.scss';

type Props = {
  loadSurveyResult: LoadSurveyResult;
  saveSurveyResult: SaveSurveyResult;
};

const SurveyResult: FC<Props> = ({ loadSurveyResult, saveSurveyResult }) => {
  const [isLoading, setIsLoading] = useState(false);
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

  const onAnswer = (answer: string) => {
    setIsLoading(true);
    saveSurveyResult.save({ answer }).then().catch();
  };

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div className={Styles.contentWrap} data-testid="survey-result">
          {surveyResult && <SurveyResultData surveyResult={surveyResult} />}
          {isLoading && <Loading />}
          {error && <ErrorComponent error={error} reload={reloadHandler} />}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  );
};

export default SurveyResult;
