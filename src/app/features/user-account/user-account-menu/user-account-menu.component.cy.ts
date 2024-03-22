import { composeStory, createMountable } from '@storybook/testing-angular';
import { UserAccountMenuComponent } from './user-account-menu.component';
import meta, {
  Primary as PrimaryStory,
  fakeUserAccountService,
} from './user-account-menu.component.stories';

const Primary = composeStory(PrimaryStory, meta);

describe(UserAccountMenuComponent.name, () => {
  beforeEach(() => {
    // intercepting this so we don't make a network request
    cy.intercept(
      { method: 'GET', resourceType: 'image', times: 1 },
      {
        fixture: 'avatar.jpg',
        headers: { 'cache-control': 'no-store' },
      }
    );
    const { component, applicationConfig } = createMountable(Primary({}, {}));
    cy.mount(component, applicationConfig);

    // TODO - look into why this doesn't return the provider from the story
    //userAccountService = TestBeb.inject(USER_ACCOUNT_SERVICE);
  });

  it("should display the user's name", () => {
    cy.contains(fakeUserAccountService.displayName()).should('exist');
  });

  it("should display the user's username", () => {
    cy.contains(fakeUserAccountService.username()).should('exist');
  });

  it("should display the user's avatar", () => {
    cy.get(`img[src="${fakeUserAccountService.picture()}"]`).should('exist');
  });

  it('should allow the user to signout', () => {
    cy.spy(fakeUserAccountService, 'signout').as('signout');
    // aria-haspopup is swapped for the [matMenuTriggerFor] attribute
    // using it will also confirm that the accessiblity is set
    // ya I know that I am testing code that I don't own but if the component
    // library doesn't add it then I should so either way it will be there
    cy.get('button[aria-haspopup="menu"').click();

    cy.get('button').contains('Sign out').click();

    cy.get('@signout').should('be.calledOnce');
  });
});
