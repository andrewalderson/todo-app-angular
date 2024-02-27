import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: async () =>
          (await import('./nx-welcome.component')).NxWelcomeComponent,
      },
];
