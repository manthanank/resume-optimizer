import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/analyze/analyze').then((m) => m.Analyze),
  },
];
