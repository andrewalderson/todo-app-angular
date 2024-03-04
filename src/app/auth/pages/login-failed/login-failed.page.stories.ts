import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { LoginFailedPage } from './login-failed.page';

const meta: Meta<LoginFailedPage> = {
  component: LoginFailedPage,
  title: 'Auth/Pages/LoginFailed',
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<LoginFailedPage>;

export const Primary: Story = {
  args: {},
};
