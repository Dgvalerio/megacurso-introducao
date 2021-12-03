import React, { FC, useState } from 'react';
import FlipMove from 'react-flip-move';

import { Footer, Header, Loading } from '../../components';
import Styles from './survey-result-styles.scss';

const SurveyResult: FC = () => {
  const [isLoading] = useState(false);

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Qual é seu framework web favorito?</h2>
        <FlipMove className={Styles.answersList}>
          <li>
            <img
              src="http://fordevs.herokuapp.com/static/img/logo-react.png"
              alt="React Logo"
            />
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li className={Styles.active}>
            <img
              src="http://fordevs.herokuapp.com/static/img/logo-react.png"
              alt="React Logo"
            />
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li>
            <img
              src="http://fordevs.herokuapp.com/static/img/logo-react.png"
              alt="React Logo"
            />
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button type="button">Voltar</button>
        {isLoading && <Loading />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
