import { render } from '@testing-library/angular';
import { ShellComponent } from './shell.component';

describe('ShellComponent', () => {
  it('should create', async () => {
    const { container } = await render(ShellComponent);

    expect(container).toBeInTheDocument();
  });
});
