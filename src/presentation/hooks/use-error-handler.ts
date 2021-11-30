import { AccessDeniedError } from '../../domain/errors';
import { useLogout } from './use-logout';

type CallbackType = (error: Error) => void;
type ResultType = CallbackType;

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const logout = useLogout();

  return (error) => {
    if (error instanceof AccessDeniedError) logout();
    else callback(error);
  };
};
