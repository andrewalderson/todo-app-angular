import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SignedOutPage } from './signed-out.page';

const meta: Meta<SignedOutPage> = {
  component: SignedOutPage,
  title: 'Auth/Pages/SignedOut',
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
type Story = StoryObj<SignedOutPage>;

export const Primary: Story = {
  args: {},
};
