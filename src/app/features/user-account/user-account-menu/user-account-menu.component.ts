import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AvatarImageDirective } from 'src/app/shared/components/avatar/avatar-image.directive';
import { AvatarInitialsFallbackComponent } from 'src/app/shared/components/avatar/avatar-initials-fallback.component';
import { AvatarComponent } from 'src/app/shared/components/avatar/avatar.component';
import {
  UserPersonaAvatarDirective,
  UserPersonaComponent,
} from 'src/app/shared/components/user-persona/user-persona.component';
import { USER_ACCOUNT_SERVICE } from '../data-access';

export const USER_ACCOUNT_MENU_SELECTOR = 'todo-user-account-menu';

@Component({
  selector: USER_ACCOUNT_MENU_SELECTOR,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    UserPersonaComponent,
    UserPersonaAvatarDirective,
    AvatarComponent,
    AvatarImageDirective,
    AvatarInitialsFallbackComponent,
  ],
  templateUrl: './user-account-menu.component.html',
  styleUrl: './user-account-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAccountMenuComponent {
  protected readonly userAccountService = inject(USER_ACCOUNT_SERVICE);
}
