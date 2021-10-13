// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import * as FormHelper from '../support/form-helper';
import * as Http from '../support/login-mocks';

const populateFields = () => {
  cy.getByTestId('email').focus().type(faker.internet.email());
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
};

const simulateValidSubmit = () => {
  populateFields();
  cy.getByTestId('submit').click();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Campo obrigatório');

    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Campo obrigatório');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'O campo email tem um valor inválido');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(2));
    FormHelper.testInputStatus(
      'password',
      'O campo password tem um valor inválido'
    );

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    FormHelper.testInputStatus('password');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError();

    simulateValidSubmit();

    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    );

    FormHelper.testUrl('/login');
  });

  it('should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError();

    simulateValidSubmit();

    FormHelper.testMainError('Credenciais inválidas');

    FormHelper.testUrl('/login');
  });

  it('should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalidData();

    simulateValidSubmit();

    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    );

    FormHelper.testUrl('/login');
  });

  it('should save accessToken if valid credentials are provided', () => {
    Http.mockOk();

    simulateValidSubmit();

    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');

    FormHelper.testUrl('/');

    FormHelper.testLocalStorageItem('account');
  });

  it('should prevent multiple submit', () => {
    Http.mockOk();

    populateFields();

    cy.getByTestId('submit').dblclick();

    FormHelper.testHttpCallsCount(1);
  });

  it('should not call submit if form is invalid', () => {
    Http.mockOk();

    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .type('{enter}');

    FormHelper.testHttpCallsCount(0);
  });
});
