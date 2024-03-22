import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import {
  USER_ACCOUNT_MENU_SELECTOR,
  UserAccountMenuComponent,
} from 'src/app/features/user-account/user-account-menu/user-account-menu.component';
import { ShellComponent } from './shell.component';

@Component({
  selector: USER_ACCOUNT_MENU_SELECTOR,
  template: '',
  standalone: true,
})
class FakeUserAccountMenuComponent {}

describe(ShellComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(ShellComponent, {
      remove: {
        imports: [UserAccountMenuComponent],
      },
      add: {
        imports: [FakeUserAccountMenuComponent],
      },
    });

    cy.mount(ShellComponent, {
      providers: [provideNoopAnimations()],
    });
  });
  context('sidenav behaviour', () => {
    context('given the display is a mobile screen', () => {
      beforeEach(() => {
        cy.viewport('iphone-8');
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

    context('given the display is not a mobile screen', () => {
      beforeEach(() => {
        cy.viewport(1024, 768);
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
