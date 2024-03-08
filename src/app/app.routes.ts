import { Route } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { authRoutes } from './auth/auth.routes';

export const appRoutes: Route[] = [
  ...authRoutes,
  {
    path: '',
    loadComponent: async () =>
      (await import('./features/onboarding/pages/welcome/welcome.page'))
        .WelcomePage,
  },
  {
    path: 'tasks',
    canActivate: [MsalGuard],
    loadComponent: async () =>
      (await import('./shell/shell.component')).ShellComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
