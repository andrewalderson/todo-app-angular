describe('Todo', () => {
  // we are logging in so we don't get redirected to the auth provider (AD B2C)
  beforeEach(() => {
    cy.login();
  });

  context('given it is the users first visit', () => {
    context('when they visit the home route', () => {
      beforeEach(() => {
        cy.visit('/').wait('@getMsalConfig');
      });
      it('should display the get started page', () => {
        cy.get('todo-get-started').should('exist');
      });
      context("when the clicks the 'Get Started' link", () => {
        it('should display the tasks view', () => {
          cy.get('a').contains('Get Started').click();

          cy.get('todo-shell').should('exist');
        });
      });
    });
  });

  context('given it is not the users first visit', () => {
    beforeEach(() => {
      window.localStorage.setItem('last-access-date', Date.now().toString());
    });
    context('when they visit the home route', () => {
      beforeEach(() => {
        cy.visit('/').wait('@getMsalConfig');
      });
      it('should display the tasks view', () => {
        // TODO - update selector when we actually have a tasks view
        cy.get('todo-shell').should('exist');
      });
    });
    context('when they deep link to the tasks view', () => {
      beforeEach(() => {
        cy.visit('/tasks').wait('@getMsalConfig');
      });
      it('should display the tasks view', () => {
        // TODO - update selector when we actually have a tasks view
        cy.get('todo-shell').should('exist');
      });
    });
  });
});
