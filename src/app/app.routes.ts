import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { authRoutes } from './auth/auth.routes';

function setPreviousSessionFlag() {
  window.localStorage.setItem('last-access-date', Date.now().toString());
}

function getPreviousSessionFlag() {
  return window.localStorage.getItem('last-access-date');
}

export const appRoutes: Route[] = [
  ...authRoutes,
  {
    path: '',
    canMatch: [
      () => {
        const location = inject(Location);
        const token = getPreviousSessionFlag();
        if (!token) {
          setPreviousSessionFlag();
        }
        return location.path().startsWith('/tasks') || token !== null;
      },
    ],
    children: [
      {
        path: 'tasks',
        canActivate: [MsalGuard],
        loadComponent: async () =>
          (await import('./shell/shell.component')).ShellComponent,
      },
      { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    canActivate: [
      () => {
        setPreviousSessionFlag();
        return true;
      },
    ],
    loadComponent: async () =>
      (await import('./features/onboarding/pages/get-started/get-started.page'))
        .GetStartedPage,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
