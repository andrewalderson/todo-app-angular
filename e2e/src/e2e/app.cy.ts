describe('e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the app shell', () => {
    cy.get('todo-welcome').should('exist');
  });
});
