import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    title: 'Hacker News | Dashboard',
    path: 'dashboard',
    pathMatch: 'full',
    loadComponent: () =>
      import('@ks/dashboard').then((m) => m.DashoardComponent),
  },
];
