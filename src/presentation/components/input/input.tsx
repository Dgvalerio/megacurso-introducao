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
    <div
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
      data-testid={`${name}-wrap`}
    >
      <input
        id={id}
        name={name}
        {...props}
        title={error}
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
      <label htmlFor={id} data-testid={`${name}-label`} title={error}>
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
