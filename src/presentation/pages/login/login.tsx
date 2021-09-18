import React, { FC } from 'react';

import Footer from '../../components/footer/footer';
import Input from '../../components/input/input';
import Header from '../../components/login-header/login-header';
import Spinner from '../../components/spinner/spinner';
import Styles from './login-styles.scss';

export const Login: FC = () => (
  <div className={Styles.login}>
    <Header />
    <form className={Styles.form}>
      <h2>Login</h2>
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="Digite seu e-mail"
      />
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Digite seu senha"
      />
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
