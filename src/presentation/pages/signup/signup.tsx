import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Footer, FormStatus, Input, LoginHeader } from '../../components';
import Context from '../../contexts/form/form-context';
import Styles from './signup-styles.scss';

const SignUp: FC = () => (
  <div className={Styles.signup}>
    <LoginHeader />
    <Context.Provider value={{ state: {} }}>
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
        <button className={Styles.submit} type="submit">
          Entrar
        </button>
        <Link className={Styles.link} to="/login">
          Voltar para Login
        </Link>
        <FormStatus />
      </form>
    </Context.Provider>
    <Footer />
  </div>
);

export default SignUp;
