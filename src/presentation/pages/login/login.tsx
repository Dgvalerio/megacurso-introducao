import React, { FC } from 'react';

import Footer from '../../components/footer/footer';
import FormStatus from '../../components/form-status/form-status';
import Input from '../../components/input/input';
import Header from '../../components/login-header/login-header';
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
      <FormStatus />
    </form>
    <Footer />
  </div>
);
