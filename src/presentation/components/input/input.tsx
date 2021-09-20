/* eslint-disable no-param-reassign */
import React, { FC } from 'react';

import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: FC<Props> = ({ id, ...props }) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.readOnly = false;
  };

  return (
    <label htmlFor={id} className={Styles.inputWrap}>
      <input id={id} {...props} readOnly onFocus={enableInput} />
      <span className={Styles.status}>🔴</span>
    </label>
  );
};

export default Input;
