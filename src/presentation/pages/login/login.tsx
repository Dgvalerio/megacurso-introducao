import React, { FC } from 'react';

import Footer from '../../components/footer/footer';
import Header from '../../components/login-header/login-header';
import Spinner from '../../components/spinner/spinner';
import Styles from './login-styles.scss';

export const Login: FC = () => (
  <div className={Styles.login}>
    <Header />
    <form className={Styles.form}>
      <h2>Login</h2>
      <label htmlFor="email">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu e-mail"
        />
        <span className={Styles.status}>🔴</span>
      </label>
      <label htmlFor="password">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Digite seu senha"
        />
        <span className={Styles.status}>🔴</span>
      </label>
      <button className={Styles.submit} type="submit">
        Entrar
      </button>
      <span className={Styles.link}>Criar conta</span>
      <div className={Styles.errorWrap}>
        <Spinner className={Styles.spinner} />
        <span className={Styles.error}>Erro</span>
      </div>
    </form>
    <Footer />
  </div>
);
