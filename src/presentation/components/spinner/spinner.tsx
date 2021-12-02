import React from 'react';

import Styles from './spinner-styles.scss';

// eslint-disable-next-line react/require-default-props
type Props = React.HTMLAttributes<HTMLElement> & { isNegative?: boolean };

const Spinner: React.FC<Props> = ({ className, isNegative, ...props }) => {
  const classNames = [
    Styles.spinner,
    isNegative ? Styles.negative : '',
    className,
  ].join(' ');

  return (
    <div {...props} className={classNames} data-testid="spinner">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
