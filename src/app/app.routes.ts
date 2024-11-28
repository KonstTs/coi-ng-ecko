import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
    },
    { 
        path: 'about',
        loadComponent: () => import('./views/about/about.component').then(m => m.PfAboutComponent) 
    },
    // { 
    //     path: 'coins',
    //     loadComponent: () => import('./views/dashboard/dashboard.component').then(m => m.PfDashboardComponent) 
    // },
];
