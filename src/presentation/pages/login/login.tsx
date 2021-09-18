import React, { FC } from 'react';

import { Footer, FormStatus, Input, LoginHeader } from '../../components';
import Styles from './login-styles.scss';

const Login: FC = () => (
  <div className={Styles.login}>
    <LoginHeader />
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

export default Login;
