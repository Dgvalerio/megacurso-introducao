import React, { FC } from 'react';

import { Footer, Logo } from '../../components';
import Styles from './survey-list-styles.scss';

const SurveyList: FC = () => (
  <div className={Styles.surveyListWrap}>
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>Davi</span>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
    <div className={Styles.contentWrap}>
      <h2>Enquetes</h2>
      <ul>
        <li>
          <div className={Styles.surveyContent}>
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>03</span>
              <span className={Styles.year}>2020</span>
            </time>
            <p>Qual é seu framework web favorito?</p>
          </div>
          <footer>Ver Resultado</footer>
        </li>
        <li>
          <div className={Styles.surveyContent}>
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>03</span>
              <span className={Styles.year}>2020</span>
            </time>
            <p>Qual é seu framework web favorito?</p>
          </div>
          <footer>Ver Resultado</footer>
        </li>
        <li>
          <div className={Styles.surveyContent}>
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>03</span>
              <span className={Styles.year}>2020</span>
            </time>
            <p>Qual é seu framework web favorito?</p>
          </div>
          <footer>Ver Resultado</footer>
        </li>
        <li>
          <div className={Styles.surveyContent}>
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>03</span>
              <span className={Styles.year}>2020</span>
            </time>
            <p>Qual é seu framework web favorito?</p>
          </div>
          <footer>Ver Resultado</footer>
        </li>
        <li>
          <div className={Styles.surveyContent}>
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>03</span>
              <span className={Styles.year}>2020</span>
            </time>
            <p>Qual é seu framework web favorito?</p>
          </div>
          <footer>Ver Resultado</footer>
        </li>
      </ul>
    </div>
    <Footer />
  </div>
);

export default SurveyList;
