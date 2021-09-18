import React, { FC } from 'react';

import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: FC<Props> = ({ id, ...props }) => (
  <label htmlFor={id} className={Styles.inputWrap}>
    <input id={id} {...props} />
    <span className={Styles.status}>🔴</span>
  </label>
);

export default Input;
