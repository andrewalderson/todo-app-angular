import { getGreeting } from '../support/app.po';

describe('e2e', () => {
  beforeEach(() => cy.login().visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains(/Welcome/);
  });
});
