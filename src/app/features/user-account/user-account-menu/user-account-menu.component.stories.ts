import { signal } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { faker } from '@faker-js/faker';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { USER_ACCOUNT_SERVICE } from '../data-access';
import { UserAccountMenuComponent } from './user-account-menu.component';

/**
 * Need to export this so we can use it in the Cypress Component Tests
 * I am not sure why I can't get the USER_ACCOUNT_SERVICE provider
 * in the tests. Need to look into this.
 */
export const fakeUserAccountService = {
  displayName: signal(faker.person.fullName()),
  username: signal(faker.internet.email()),
  picture: signal(faker.image.avatar()),
  signout: () => true,
};

const meta: Meta<UserAccountMenuComponent> = {
  component: UserAccountMenuComponent,
  title: 'Features/UserAccount/UserAccountMenu',
  decorators: [
    applicationConfig({
      providers: [
        provideNoopAnimations(),
        { provide: USER_ACCOUNT_SERVICE, useValue: fakeUserAccountService },
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
    viewport: {
      disable: true,
    },
  },
  excludeStories: ['fakeUserAccountService'],
};
export default meta;
type Story = StoryObj<UserAccountMenuComponent>;

export const Primary: Story = {
  args: {},
};
