import { composeStory, createMountable } from '@storybook/testing-angular';
import { IllustratedMessageComponent } from './illustrated-message.component';
import meta, {
  Primary as PrimaryStory,
} from './illustrated-message.component.stories';

const Primary = composeStory(PrimaryStory, meta);

describe(IllustratedMessageComponent.name, () => {
  beforeEach(() => {
    const { component, applicationConfig } = createMountable(Primary({}));
    cy.mount(component, applicationConfig);
  });

  it('should display the illustration', async () => {
    cy.get('[data-testid="illustration"]').should('exist');
  });

  it('should display the heading', async () => {
    cy.contains(Primary.args?.heading).should('exist');
  });

  it('should display the description', async () => {
    cy.contains(Primary.args?.description).should('exist');
  });
});
