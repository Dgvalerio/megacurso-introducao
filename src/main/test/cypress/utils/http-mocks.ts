// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

export const mockUnauthorizedError = (url: RegExp) => {
  cy.server();
  cy.route({
    method: 'POST',
    url,
    status: 401,
    response: { error: faker.random.words() },
  }).as('request');
};

export const mockForbiddenError = (url: RegExp, method: string) => {
  cy.server();
  cy.route({
    method,
    url,
    status: 403,
    response: { error: faker.random.words() },
  }).as('request');
};

export const mockServerError = (url: RegExp, method: string) => {
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

export const mockOk = (url: RegExp, method: string, response: any) => {
  cy.server();
  cy.route({
    method,
    url,
    status: 200,
    response,
  }).as('request');
};
