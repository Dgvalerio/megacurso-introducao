import { RemoteLoadSurveyList } from '../../../../data/usecases/load-survey-list/remote-load-survey-list';
import { LoadSurveyList } from '../../../../domain/usecases/load-survey-list';
import { makeApiUrl } from '../../http/api-url-factory';
import { makeAxiosHttpCliente } from '../../http/axios-htttp-client-factory';

export const makeRemoteLoadSurveyList = (): LoadSurveyList =>
  new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAxiosHttpCliente());
