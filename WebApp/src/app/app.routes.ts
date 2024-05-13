import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IntranetComponent } from './pages/intranet/intranet.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'intranet', component: IntranetComponent },
    { path: '**', component: PageNotFoundComponent },
];
