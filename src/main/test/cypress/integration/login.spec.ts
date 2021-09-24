// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

const { baseUrl } = Cypress.config();

describe('Login', () => {
  beforeEach(() => {
    cy.server();

    cy.visit('login');
  });

  it('should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴');

    cy.getByTestId('password').should('have.attr', 'readOnly');

    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'O campo email tem um valor inválido')
      .should('contain.text', '🔴');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(2));
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'O campo password tem um valor inválido')
      .should('contain.text', '🔴');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present InvalidCredentialsError on 401', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 401,
      response: {
        error: faker.random.words(),
      },
    });

    cy.getByTestId('email').focus().type(faker.internet.email());

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));

    cy.getByTestId('submit').click();

    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('main-error').should(
      'contain.text',
      'Credenciais inválidas'
    );

    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('should save accessToken if valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.datatype.uuid(),
      },
    });

    cy.getByTestId('email').focus().type('mango@gmail.com');

    cy.getByTestId('password').focus().type('12345');

    cy.getByTestId('submit').click();

    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');

    cy.url().should('eq', `${baseUrl}/`);

    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem('accessToken'))
    );
  });
});
