import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /surveys/;

const mockUnexpectedError = () => Http.mockServerError(path, 'GET');

const mockAccessDeniedError = () => Http.mockForbiddenError(path, 'GET');

const mockSuccess = () => Http.mockOk(path, 'GET', 'fx:survey-result');

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account);
    });
  });

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.visit('/surveys/any_id');

    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    );
  });

  it('should reload on button click', () => {
    mockUnexpectedError();
    cy.visit('/surveys/any_id');

    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    );

    mockSuccess();

    cy.getByTestId('reload').click();
    cy.getByTestId('question').should('exist');
  });

  it('should logout on AccessDeniedError', () => {
    mockAccessDeniedError();
    cy.visit('/surveys/any_id');

    Helper.testUrl('/login');
  });
});
