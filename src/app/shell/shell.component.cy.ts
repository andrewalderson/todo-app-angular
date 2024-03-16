import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IS_SMALL_SCREEN } from '../app.tokens';
import { ShellComponent } from './shell.component';

const isSmallScreen = signal(false);

describe(ShellComponent.name, () => {
  beforeEach(() => {
    cy.mount(ShellComponent, {
      imports: [NoopAnimationsModule],
      providers: [{ provide: IS_SMALL_SCREEN, useValue: isSmallScreen }],
    });
  });
  context('sidenav behaviour', () => {
    context('given the display is a small screen', () => {
      // setting the signal needs to be done in a before hook
      // not sure why beforeEach doesn't work here
      before(() => {
        isSmallScreen.set(true);
      });
      it('should have a closed sidenav', () => {
        cy.get('[data-testid="sidenav"]').should('not.be.visible');
      });

      it('should be able to toggle sidenav', () => {
        cy.get('[data-testid="sidenav-toggle-button"]').click({
          force: true,
        });

        cy.get('[data-testid="sidenav"]').should('be.visible');

        cy.get('[data-testid="sidenav-toggle-button"]').click({
          force: true,
        });

        cy.get('[data-testid="sidenav"]').should('not.be.visible');
      });
    });

    context('given the display is not a small screen', () => {
      // setting the signal needs to be done in a before hook
      // not sure why beforeEach doesn't work here
      before(() => {
        isSmallScreen.set(false);
      });
      it('should have a fixed sidenav', () => {
        cy.get('[data-testid="sidenav"]').should('be.visible');
      });

      it('should not be able to toggle sidenav', () => {
        cy.get('[data-testid="sidenav-toggle-button"]').should('not.exist');
      });
    });
  });
});
