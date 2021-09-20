import React, { FC, useEffect, useState } from 'react';

import { Footer, FormStatus, Input, LoginHeader } from '../../components';
import Context from '../../contexts/form/form-context';
import { Validation } from '../../protocols/validation';
import Styles from './login-styles.scss';

type Props = {
  validation: Validation;
};

const Login: FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    emailError: 'Campo obrigatório',
    password: '',
    passwordError: 'Campo obrigatório',
    mainError: '',
  });

  useEffect(() => {
    validation.validate('email', state.email);
  }, [state.email]);

  useEffect(() => {
    validation.validate('password', state.password);
  }, [state.password]);

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
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
          <button
            className={Styles.submit}
            type="submit"
            data-testid="submit"
            disabled
          >
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
