import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { GetStartedPage } from './get-started.page';

const meta: Meta<GetStartedPage> = {
  component: GetStartedPage,
  title: 'Onboarding/Pages/Get Started',
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
type Story = StoryObj<GetStartedPage>;

export const Primary: Story = {
  args: {},
};
