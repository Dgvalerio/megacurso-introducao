import React, { FC, useState } from 'react';

import { Footer, FormStatus, Input, LoginHeader } from '../../components';
import Context from '../../contexts/form/form-context';
import Styles from './signup-styles.scss';

const SignUp: FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: '',
  });

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state }}>
        <form className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome"
          />
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
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />
          <button
            className={Styles.submit}
            type="submit"
            data-testid="submit"
            disabled
          >
            Entrar
          </button>
          <span className={Styles.link}>Voltar para Login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
