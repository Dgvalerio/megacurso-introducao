/* eslint-disable no-param-reassign */
import React, { FC, useContext } from 'react';

import Context from '../../contexts/form/form-context';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: FC<Props> = ({ id, name, ...props }) => {
  const { state, setState } = useContext(Context);
  const error = state[`${name}Error`];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.readOnly = false;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const getStatus = (): string => (error ? '🔴' : '🟢');

  const getTitle = (): string => error || 'Tudo certo!';

  return (
    <label htmlFor={id} className={Styles.inputWrap}>
      <input
        id={id}
        name={name}
        {...props}
        readOnly
        onFocus={enableInput}
        data-testid={name}
        onChange={handleChange}
      />
      <span
        data-testid={`${name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </label>
  );
};

export default Input;
