import { Component } from '@angular/core';
import { Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { AvatarIconFallbackComponent } from './avatar-icon-fallback.component';
import { AvatarImageDirective } from './avatar-image.directive';
import { AvatarInitialsFallbackComponent } from './avatar-initials-fallback.component';
import { AvatarComponent, AvatarFallbackDirective } from './avatar.component';

export type StoryArgTypes = AvatarComponent &
  HTMLImageElement &
  AvatarInitialsFallbackComponent & {
    borderWidth: number;
    content: string;
  };

type Story = StoryObj<StoryArgTypes>;

const calculateStyles = (args: StoryArgTypes) => {
  let style = '--todo-avatar-size: 96px;';
  if (args.borderWidth) {
    style += `--todo-avatar-border-width: ${args.borderWidth}px`;
  }
  return style ? `style="${style}"` : '';
};

@Component({
  selector: 'todo-avatar-custom-fallback[todoAvatarFallback]',
  standalone: true,
  template: ` <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    height="100%"
    width="100%"
    fill="currentColor"
  >
    <path
      d="M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48H45.4C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4H342.7c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.7 3.3-8.8 6.1-15.5 6.1zm56 208H267.6c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2H168c-22.1 0-40-17.9-40-40V169.6c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4V184c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z"
    />
  </svg>`,
  styles: [
    `
      :host {
        display: block;
        height: 80%;
        width: 80%;
        overflow: hidden;
        border-width: 1px;
        border-style: solid;
        border-color: transparent;
        border-radius: 50%;
      }
    `,
  ],
})
class AvatarCustomIconComponent {}

const meta: Meta<StoryArgTypes> = {
  title: 'Shared/Components/Avatar',
  component: AvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        AvatarCustomIconComponent,
        AvatarFallbackDirective,
        AvatarImageDirective,
        AvatarInitialsFallbackComponent,
        AvatarIconFallbackComponent,
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
    viewport: {
      disable: true,
    },
  },
  argTypes: {
    color: {
      name: 'color (Material Theme Palette)',
      description: 'Sets the background, border and font colors where used',
      control: {
        type: 'select',
        labels: {
          undefined: 'None',
          primary: 'Primary',
          accent: 'Accent',
          warn: 'warn',
        },
      },
      options: [undefined, 'primary', 'accent', 'warn'],
    },
    borderWidth: {
      name: '--todo-avatar-border-width',
      control: { type: 'number', min: 0 },
      table: {
        category: 'CSS',
        defaultValue: 0,
        type: { summary: 'number' },
      },
    },
    content: {
      table: {
        disable: true,
      },
    },
    initialsName: {
      description: 'The string (usually full name) to extract initials from',
      if: { arg: 'initialsName', exists: true },
    },
    colorsName: {
      description:
        'The string (usually username) to create avatar color from - falls back to initialsName if undefined',
      if: { arg: 'colorsName', exists: true },
    },
    src: {
      description: 'The url of the image to display (should be a square image)',
      control: { type: 'file', accept: 'image/*' },
      if: { arg: 'src', exists: true },
    },
  },
  args: {
    color: undefined,
    borderWidth: 0,
    content: '',
  },
  render: (args) => ({
    props: args,
    template: `<todo-avatar ${calculateStyles(args)} 
    ${args.color ? '[color]="color"' : ''}>${args.content}</todo-avatar>`,
  }),
};

export default meta;

export const WithImage: Story = {
  args: {
    src: 'avatar.jpg',
    content: '<img todoAvatarImage [src]="src"/>',
  },
};

export const WithIconFallback: Story = {
  args: {
    content: `<todo-avatar-icon-fallback>
    <svg
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    viewBox="0 0 128 128"
    fill="currentColor"
    width="100%"
    height="100%"
  >
    <path
      d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
    />
    <path
      d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
    />
  </svg>
  </todo-avatar-icon-fallback>`,
  },
};

export const WithCustomFallback: Story = {
  args: {
    content: '<todo-avatar-custom-fallback todoAvatarFallback/>',
  },
};

export const WithInitialsFallback: Story = {
  args: {
    initialsName: 'William Wallace',
    colorsName: 'william.wallace@outlook.com',
    content:
      '<todo-avatar-initials-fallback [initialsName]="initialsName" [colorsName]="colorsName"/>',
  },
};
