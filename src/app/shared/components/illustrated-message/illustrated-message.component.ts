import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'todo-illustrated-message',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="todo-illustrated-message-illustration">
      <ng-content select="svg"></ng-content>
    </div>
    <h2 class="todo-illustrated-message-heading">{{ heading }}</h2>
    @if(description) {
    <div class="todo-illustrated-message-description">
      {{ description }}
    </div>
    } `,
  styles: `
    :host {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }

    svg[viewBox] {
      width: 100%;
    }

    .todo-illustrated-message-illustration {
      color: var(--todo-illustrated-message-illustration-color);
      /* Safari 16.3 🐛🛠️: Repeated stroke/fill properties is a workaround for a currentcolor bug that was fixed in 16.4. */
      fill: currentColor;
      stroke: currentColor;
      margin-block-start: 0;
      margin-block-end: 0;
    }

    .todo-illustrated-message-heading {
      margin-block-start: var(--todo-illustrated-message-illustration-to-heading-gap, 24px);
      margin-block-end: 0;
      max-width: var(--todo-illustrated-message-heading-max-inline-size, 500px);
      font-family: var(--todo-illustrated-message-heading-font-family);
      font-size: var(--todo-illustrated-message-heading-font-size);
      font-weight: var(--todo-illustrated-message-heading-font-weight);
      line-height: var(--todo-illustrated-message-heading-line-height);
      color: var(--todo-illustrated-message-heading-color);
    }

    .todo-illustrated-message-description {
      margin-block-start: var(--todo-illustrated-message-heading-to-description-gap, 8px);
      margin-block-end: 0;
      max-width: var(--todo-illustrated-message-description-max-inline-size, 500px);
      font-family: var(--todo-illustrated-message-description-font-family);
      font-size: var(--todo-illustrated-message-description-font-size);
      font-weight: var(--todo-illustrated-message-description-font-weight);
      line-height: var(--todo-illustrated-message-description-line-height);
      color: var(--todo-illustrated-message-description-color);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IllustratedMessageComponent {
  @Input({ required: true }) heading!: string;

  @Input() description?: string;
}
