import React, { FC, useEffect, useState } from 'react';

import { LoadSurveyList } from '../../../domain/usecases';
import { Footer, Header, Error as ErrorComponent } from '../../components';
import { useErrorHandler } from '../../hooks';
import { SurveyListItem } from './components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: FC<Props> = ({ loadSurveyList }) => {
  const handleError = useErrorHandler((error: Error) => {
    setError(error.message);
  });

  const [surveys, setSurveys] = useState<LoadSurveyList.Model[]>([]);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(false);

  const reLoad = () => {
    setSurveys([]);
    setError('');
    setReload((prev) => !prev);
  };

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((response) => {
        setSurveys(response);
        setError('');
      })
      .catch(handleError);
  }, [reload]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {error ? (
          <ErrorComponent error={error} reload={reLoad} />
        ) : (
          <SurveyListItem surveys={surveys} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
