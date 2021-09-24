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

  return (
    <div className={Styles.inputWrap}>
      <input
        id={id}
        name={name}
        {...props}
        placeholder=" "
        readOnly
        onFocus={(e) => {
          e.target.readOnly = false;
        }}
        data-testid={name}
        onChange={(e) =>
          setState({ ...state, [e.target.name]: e.target.value })
        }
      />
      <label htmlFor={id}>{props.placeholder}</label>
      <span
        data-testid={`${name}-status`}
        title={error || 'Tudo certo!'}
        className={Styles.status}
      >
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  );
};

export default Input;
