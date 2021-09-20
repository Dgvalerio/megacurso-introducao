/* eslint-disable no-param-reassign */
import React, { FC, useContext } from 'react';

import Context from '../../contexts/form/form-context';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: FC<Props> = ({ id, name, ...props }) => {
  const { errorState } = useContext(Context);
  const error = errorState[name];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.readOnly = false;
  };

  const getStatus = (): string => '🔴';

  const getTitle = (): string => error;

  return (
    <label htmlFor={id} className={Styles.inputWrap}>
      <input id={id} name={name} {...props} readOnly onFocus={enableInput} />
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
