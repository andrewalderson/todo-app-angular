import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { IS_SMALL_SCREEN } from '../app.tokens';
import { UserAccountMenuComponent } from '../features/user-account/user-account-menu/user-account-menu.component';
import { LogoComponent } from './logo.component';

@Component({
  selector: 'todo-shell',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    LogoComponent,
    UserAccountMenuComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  protected isSmallScreen = inject(IS_SMALL_SCREEN);
}
