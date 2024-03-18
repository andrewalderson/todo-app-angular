import { faker } from '@faker-js/faker';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AvatarInitialsFallbackComponent } from '../avatar/avatar-initials-fallback.component';
import { AvatarComponent } from '../avatar/avatar.component';
import {
  UserPersonaAvatarDirective,
  UserPersonaComponent,
} from './user-persona.component';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const displayName = `${firstName} ${lastName}`;
const username = faker.internet.email({ firstName, lastName });

const meta: Meta<UserPersonaComponent> = {
  component: UserPersonaComponent,
  title: 'Shared/Components/UserPersona',
  decorators: [
    moduleMetadata({
      imports: [
        UserPersonaAvatarDirective,
        AvatarComponent,
        AvatarInitialsFallbackComponent,
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<UserPersonaComponent>;

const Template: Story = {
  render: (args) => ({
    props: args,
    template: `<todo-user-persona [primaryText]="primaryText" [secondaryText]="secondaryText">
                  <todo-avatar todoUserPersonaAvatar>
                    <todo-avatar-initials-fallback
                      [initialsName]="primaryText"
                      [colorsName]="secondaryText"
                    />
                  </todo-avatar>
              </todo-user-persona>`,
  }),
};

export const Primary: Story = {
  ...Template,
  args: {
    primaryText: displayName,
    secondaryText: username,
  },
};
