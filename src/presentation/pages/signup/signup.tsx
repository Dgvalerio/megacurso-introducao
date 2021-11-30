import React, { FC, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AddAccount } from '../../../domain/usecases';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton,
} from '../../components';
import { FormContext, ApiContext } from '../../contexts';
import { Validation } from '../../protocols/validation';
import Styles from './signup-styles.scss';

type Props = {
  validation: Validation;
  addAccount: AddAccount;
};

const SignUp: FC<Props> = ({ validation, addAccount }) => {
  const { setCurrentAccount } = useContext(ApiContext);
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    mainError: '',
  });

  const validate = (field: string) => {
    const { name, email, password, passwordConfirmation } = state;
    const formData = { name, email, password, passwordConfirmation };

    setState((oldState) => ({
      ...oldState,
      [`${field}Error`]: validation.validate(field, formData),
    }));

    setState((oldState) => ({
      ...oldState,
      isFormInvalid: !!(
        oldState.nameError ||
        oldState.emailError ||
        oldState.passwordError ||
        oldState.passwordConfirmationError
      ),
    }));
  };

  useEffect(() => validate('name'), [state.name]);
  useEffect(() => validate('email'), [state.email]);
  useEffect(() => validate('password'), [state.password]);
  useEffect(
    () => validate('passwordConfirmation'),
    [state.passwordConfirmation]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) return;

      setState((prev) => ({ ...prev, isLoading: true }));

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      });

      setCurrentAccount(account);
      history.replace('/');
    } catch (e) {
      setState((prev) => ({ ...prev, isLoading: false, mainError: e.message }));
    }
  };

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form
          className={Styles.form}
          data-testid="form"
          onSubmit={handleSubmit}
        >
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
          <SubmitButton text="Cadastrar" />
          <Link
            className={Styles.link}
            data-testid="login-link"
            replace
            to="/login"
          >
            Voltar para Login
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
