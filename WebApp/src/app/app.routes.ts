import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IntranetComponent } from './pages/intranet/intranet.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './authentication/auth.guard';
import { Error403Component } from './pages/error-403/error-403.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
        path: 'intranet', component: IntranetComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/intranet/intranet.module').then(mod => mod.IntranetModule)
    },
    {
        path: 'acervo',
        loadChildren: () => import('./pages/acervo/acervo.module').then(mod => mod.AcervoModule)
    },
    { path: 'login', component: LoginComponent },
    {
        path: 'errors', children: [
            {
                path: '403',
                component: Error403Component
            }
        ]
    },
    { path: '**', component: PageNotFoundComponent },
];