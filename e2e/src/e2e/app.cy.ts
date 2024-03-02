describe('e2e', () => {
  beforeEach(() => cy.login().visit('/'));

  it('should display the app shell', () => {
    cy.get('todo-shell').should('exist');
  });
});
