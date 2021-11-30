const { baseUrl } = Cypress.config();

export const testHttpCallsCount = (count: number) => {
  cy.get('@request.all').should('have.length', count);
};

export const testUrl = (path: string) => {
  cy.url().should('eq', `${baseUrl}${path}`);
};

export const testLocalStorageItem = (key: string) => {
  cy.window().then((window) => assert.isOk(window.localStorage.getItem(key)));
};

export const setLocalStorageItem = (key: string, value: object) => {
  localStorage.setItem(key, JSON.stringify(value));
};
