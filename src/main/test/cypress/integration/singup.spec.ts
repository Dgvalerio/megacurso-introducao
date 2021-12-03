// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import * as FormHelper from '../utils/form-helpers';
import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /signup/;

const populateFields = () => {
  cy.getByTestId('name').focus().type(faker.name.findName());
  cy.getByTestId('email').focus().type(faker.internet.email());
  const password = faker.random.alphaNumeric(7);
  cy.getByTestId('password').focus().type(password);
  cy.getByTestId('passwordConfirmation').focus().type(password);
};

const simulateValidSubmit = () => {
  populateFields();
  cy.getByTestId('submit').click();
};

export const mockEmailInUseError = () => Http.mockForbiddenError(path, 'POST');

export const mockUnexpectedError = () => Http.mockServerError(path, 'POST');

export const mockSuccess = () =>
  Http.mockOk(path, 'POST', {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName(),
  });

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup');
  });

  it('should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('name', 'Campo obrigatório');

    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Campo obrigatório');

    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Campo obrigatório');

    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(2));
    FormHelper.testInputStatus('name', 'O campo name tem um valor inválido');

    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'O campo email tem um valor inválido');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(2));
    FormHelper.testInputStatus(
      'password',
      'O campo password tem um valor inválido'
    );

    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(faker.random.alphaNumeric(2));
    FormHelper.testInputStatus(
      'passwordConfirmation',
      'O campo passwordConfirmation tem um valor inválido'
    );

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.name.findName());
    FormHelper.testInputStatus('name');

    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');

    const password = faker.random.alphaNumeric(5);

    cy.getByTestId('password').focus().type(password);
    FormHelper.testInputStatus('password');

    cy.getByTestId('passwordConfirmation').focus().type(password);
    FormHelper.testInputStatus('passwordConfirmation');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present EmailInUseError on 403', () => {
    mockEmailInUseError();

    simulateValidSubmit();

    FormHelper.testMainError('Esse e-mail já está em uso');

    Helper.testUrl('/signup');
  });

  it('should present UnexpectedError on default error cases', () => {
    mockUnexpectedError();

    simulateValidSubmit();

    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    );

    Helper.testUrl('/signup');
  });

  it('should save accessToken if valid credentials are provided', () => {
    mockSuccess();

    simulateValidSubmit();

    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');

    Helper.testUrl('/');

    Helper.testLocalStorageItem('account');
  });

  it('should prevent multiple submit', () => {
    mockSuccess();

    populateFields();

    cy.getByTestId('submit').dblclick();

    cy.wait('@request');
    Helper.testHttpCallsCount(1);
  });

  it('should not call submit if form is invalid', () => {
    mockSuccess();

    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .type('{enter}');

    Helper.testHttpCallsCount(0);
  });
});
