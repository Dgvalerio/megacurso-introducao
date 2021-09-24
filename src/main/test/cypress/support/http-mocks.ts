// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

export const mockInvalidCredentialsError = (url: RegExp) => {
  cy.server();
  cy.route({
    method: 'POST',
    url,
    status: 401,
    response: { error: faker.random.words() },
  }).as('request');
};

export const mockUnexpectedError = (method: string, url: RegExp) => {
  cy.server();
  cy.route({
    method,
    url,
    status: faker.helpers.randomize([400, 404, 500]),
    response: {
      error: faker.random.words(),
    },
  }).as('request');
};

export const mockOk = (method: string, url: RegExp, response: any) => {
  cy.server();
  cy.route({
    method,
    url,
    status: 200,
    response,
  }).as('request');
};
