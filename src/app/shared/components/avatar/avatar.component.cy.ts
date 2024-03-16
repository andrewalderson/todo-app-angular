import { ThemePalette } from '@angular/material/core';
import { composeStories, createMountable } from '@storybook/testing-angular';
import { AvatarComponent } from './avatar.component';
import * as stories from './avatar.component.stories';
import { StoryArgTypes } from './avatar.component.stories';

const {
  WithIconFallback,
  WithCustomFallback,
  WithImage,
  WithInitialsFallback,
} = composeStories<StoryArgTypes, typeof stories>(stories);

describe(AvatarComponent.name, () => {
  describe('rendering', () => {
    context('given an image is not added', () => {
      context('and an icon fallback is defined', () => {
        it('should render the icon fallback', () => {
          const { component, applicationConfig } = createMountable(
            WithIconFallback({})
          );
          cy.mount(component, applicationConfig);

          cy.get('todo-avatar-icon-fallback').should('exist');
        });
      });
      context('and an initials fallback is defined', () => {
        beforeEach(() => {
          const { component, applicationConfig } = createMountable(
            WithInitialsFallback({})
          );
          cy.mount(component, applicationConfig);
        });
        it('should render the initials fallback', () => {
          cy.get('todo-avatar')
            .find('todo-avatar-initials-fallback')
            .should('exist');
        });
      });
      context('and a custom fallback is defined', () => {
        beforeEach(() => {
          const { component, applicationConfig } = createMountable(
            WithCustomFallback({})
          );
          cy.mount(component, applicationConfig);
        });
        it('should render the custom fallback', () => {
          cy.get('todo-avatar').find('[todoAvatarFallback]').should('exist');
        });
      });
    });

    context('given an image is added', () => {
      const src = 'https://some/image-url';
      context('and the image loads successfully', () => {
        beforeEach(() => {
          cy.intercept(
            { method: 'GET', url: src, times: 1 },
            {
              fixture: 'avatar.jpg',
              headers: { 'cache-control': 'no-store' },
            }
          ).as('imageRequest');

          const { component, applicationConfig } = createMountable(
            WithImage({
              src,
              content: `<img todoAvatarImage [src]="src"/>
              <todo-avatar-icon-fallback>
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
            })
          );
          cy.mount(component, applicationConfig);

          cy.wait('@imageRequest');
        });
        it('should render the image', () => {
          cy.get('todo-avatar')
            .find('img[todoAvatarImage]', { includeShadowDom: true })
            .should('exist')
            .and('have.attr', 'src', src);
        });

        it('should not render the fallback', () => {
          cy.get('todo-avatar')
            .find('todo-avatar-icon-fallback')
            .should('not.exist');
        });
      });
      context('and the image fails to load', () => {
        beforeEach(() => {
          cy.intercept(
            { method: 'GET', url: src, times: 1 },
            {
              statusCode: 404,
            }
          ).as('imageRequest');

          const { component, applicationConfig } = createMountable(
            WithImage({
              src,
              content: `<img todoAvatarImage [src]="src"/>
              <todo-avatar-icon-fallback>
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
            })
          );
          cy.mount(component, applicationConfig);

          cy.wait('@imageRequest');
        });
        it('should not render the image', () => {
          cy.get('todo-avatar')
            .find('img[todoAvatarImage]', { includeShadowDom: true })
            .should('not.exist');
        });

        it('should render the fallback', () => {
          cy.get('todo-avatar')
            .find('todo-avatar-icon-fallback')
            .should('exist');
        });
      });
    });
  });
  describe('styling', () => {
    context('given a theme color is not specified', () => {
      beforeEach(() => {
        const { component, applicationConfig } = createMountable(
          WithIconFallback({})
        );
        cy.mount(component, applicationConfig);
      });
      it("should add the class 'mat-unthemed'", () => {
        cy.get('todo-avatar').should('have.class', `mat-unthemed`);
      });
    });
    context('given a theme color is specified', () => {
      const colors: ThemePalette[] = ['primary', 'accent', 'warn'];
      colors.forEach((color) => {
        context(`and the theme color is ${color}`, () => {
          beforeEach(() => {
            const { component, applicationConfig } = createMountable(
              WithIconFallback({
                color,
              })
            );
            cy.mount(component, applicationConfig);
          });
          it(`should have the class 'mat-${color}'`, () => {
            cy.get('todo-avatar').should('have.class', `mat-${color}`);
          });
          it(`should not add the class 'mat-unthemed'`, () => {
            cy.get('todo-avatar').should('not.have.class', `mat-unthemed`);
          });
        });
      });
    });
  });
  describe('accessibility', () => {
    context('given an aria-hidden attribute is not defined', () => {
      it(`should add an aria-hidden attribute with a value of 'true'`, () => {
        cy.mount(`<todo-avatar />`, {
          imports: [AvatarComponent],
        });

        cy.get('todo-avatar').should('have.attr', 'aria-hidden', 'true');
      });
    });
    context('given an aria-hidden attribute is defined', () => {
      it('should not override the existing value', () => {
        cy.mount(`<todo-avatar aria-hidden="false"/>`, {
          imports: [AvatarComponent],
        });

        cy.get('todo-avatar').should('have.attr', 'aria-hidden', 'false');
      });
    });
  });
});
