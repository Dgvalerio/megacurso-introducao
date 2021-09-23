import React, { FC, useContext } from 'react';

import Context from '../../contexts/form/form-context';

type Props = {
  text: string;
};

const SubmitButton: FC<Props> = ({ text }) => {
  const { state } = useContext(Context);

  return (
    <button type="submit" data-testid="submit" disabled={state.isFormInvalid}>
      {text}
    </button>
  );
};

export default SubmitButton;
