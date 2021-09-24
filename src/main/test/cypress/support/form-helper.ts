const { baseUrl } = Cypress.config();

export const testInputStatus = (fieldName: string, error?: string) => {
  cy.getByTestId(`${fieldName}-wrap`).should(
    'have.attr',
    'data-status',
    error ? 'invalid' : 'valid'
  );

  const check = `${error ? '' : 'not.'}have.attr`;

  cy.getByTestId(fieldName).should(check, 'title', error);
  cy.getByTestId(`${fieldName}-label`).should(check, 'title', error);
};

export const testMainError = (error: string) => {
  cy.getByTestId('spinner').should('not.exist');
  cy.getByTestId('main-error').should('contain.text', error);
};

export const testHttpCallsCount = (count: number) => {
  cy.get('@request.all').should('have.length', count);
};

export const testUrl = (path: string) => {
  cy.url().should('eq', `${baseUrl}${path}`);
};

export const testLocalStorageItem = (key: string) => {
  cy.window().then((window) => assert.isOk(window.localStorage.getItem(key)));
};
