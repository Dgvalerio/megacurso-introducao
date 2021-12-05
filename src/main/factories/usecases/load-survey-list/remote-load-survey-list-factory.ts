import { RemoteLoadSurveyList } from '../../../../data/usecases';
import { LoadSurveyList } from '../../../../domain/usecases';
import { makeAuthorizeHttpGetClientDecorator } from '../../decorators';
import { makeApiUrl } from '../../http/api-url-factory';

export const makeRemoteLoadSurveyList = (): LoadSurveyList =>
  new RemoteLoadSurveyList(
    makeApiUrl('/surveys'),
    makeAuthorizeHttpGetClientDecorator()
  );
