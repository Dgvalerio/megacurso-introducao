import React, { FC, useEffect, useState } from 'react';

import { Authentication } from '../../../domain/usecases';
import { Footer, FormStatus, Input, LoginHeader } from '../../components';
import Context from '../../contexts/form/form-context';
import { Validation } from '../../protocols/validation';
import Styles from './login-styles.scss';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: FC<Props> = ({ validation, authentication }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    });
  }, [state.email, state.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (state.isLoading) return;

    setState((prev) => ({ ...prev, isLoading: true }));
    await authentication.auth({ email: state.email, password: state.password });
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
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
            disabled={!!(state.emailError || state.passwordError)}
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
