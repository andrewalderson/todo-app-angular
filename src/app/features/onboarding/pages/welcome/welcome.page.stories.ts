import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { WelcomePage } from './welcome.page';

const meta: Meta<WelcomePage> = {
  component: WelcomePage,
  title: 'Onboarding/Pages/Welcome',
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
type Story = StoryObj<WelcomePage>;

export const Primary: Story = {
  args: {},
};
