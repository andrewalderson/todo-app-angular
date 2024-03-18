import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
} from '@angular/core';

@Directive({
  selector: '[todoUserPersonaAvatar]',
  standalone: true,
})
export class UserPersonaAvatarDirective {}

@Component({
  selector: 'todo-user-persona',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-persona.component.html',
  styleUrl: './user-persona.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPersonaComponent {
  @Input({ required: true }) primaryText!: string;

  @Input() secondaryText?: string;
}
