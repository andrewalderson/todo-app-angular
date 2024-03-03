import { composeStory, createMountable } from '@storybook/testing-angular';
import { render, screen } from '@testing-library/angular';
import meta, {
  Primary as PrimaryStory,
} from './illustrated-message.component.stories';

const Primary = composeStory(PrimaryStory, meta);

describe('IllustratedMessageComponent', () => {
  it('should create', async () => {
    const { component, applicationConfig } = createMountable(Primary({}));
    const { container } = await render(component, {
      providers: applicationConfig.providers,
    });

    expect(container).toBeInTheDocument();
  });

  it('should display the illustration', async () => {
    const { component, applicationConfig } = createMountable(Primary({}));
    await render(component, {
      providers: applicationConfig.providers,
    });

    expect(screen.getByTestId('illustration')).toBeInTheDocument();
  });

  it('should display the heading', async () => {
    const { component, applicationConfig } = createMountable(Primary({}));
    await render(component, {
      providers: applicationConfig.providers,
    });

    expect(screen.getByText(Primary.args?.heading)).toBeInTheDocument();
  });

  it('should display the description', async () => {
    const { component, applicationConfig } = createMountable(Primary({}));
    await render(component, {
      providers: applicationConfig.providers,
    });

    expect(screen.getByText(Primary.args?.description)).toBeInTheDocument();
  });
});
