import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AccessDeniedError } from '../../domain/errors';
import { ApiContext } from '../contexts';

type CallbackType = (error: Error) => void;
type ResultType = CallbackType;

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const history = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);

  return (error) => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined);
      history.replace('/login');
    } else {
      callback(error);
    }
  };
};
