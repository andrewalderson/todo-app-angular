import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'todo-login-failed',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `<p>Login failed</p>
    <a routerLink="/">Try again</a>`,
  styles: [
    `
      :host {
        --_gap: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--_gap);
        padding: var(--_gap);
        min-height: calc(100% - var(--_gap) * 2);
        position: relative;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFailedPage {}
