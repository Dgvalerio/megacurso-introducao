import React, { FC, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Authentication, SaveAccessToken } from '../../../domain/usecases';
import { Footer, FormStatus, Input, LoginHeader } from '../../components';
import Context from '../../contexts/form/form-context';
import { Validation } from '../../protocols/validation';
import Styles from './login-styles.scss';

type Props = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
};

const Login: FC<Props> = ({ validation, authentication, saveAccessToken }) => {
  const history = useHistory();
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

    try {
      if (state.isLoading || state.emailError || state.passwordError) return;

      setState((prev) => ({ ...prev, isLoading: true }));

      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });

      await saveAccessToken.save(account.accessToken);
      history.replace('/');
    } catch (e) {
      setState((prev) => ({ ...prev, isLoading: false, mainError: e.message }));
    }
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          className={Styles.form}
          onSubmit={handleSubmit}
          data-testid="form"
        >
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
          <Link className={Styles.link} data-testid="signup-link" to="/signup">
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
