import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IntranetComponent } from './pages/intranet/intranet.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AcervoComponent } from './pages/acervo/acervo.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './authentication/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
        path: 'intranet', component: IntranetComponent,
        canActivate: [AuthGuard] ,
        children: [
            {
                path: 'renovacao', pathMatch: 'full',
                loadChildren: () => import('./pages/intranet/renovacao/renovacao.module').then(mod => mod.RenovacaoModule)
            },
            {
                path: 'obra-emprestada',
                loadChildren: () => import('./pages/intranet/obra-emprestada/obra-emprestada.module').then(mod => mod.ObraEmprestadaModule)
            },
            {
                path: 'perfil-usuario',
                loadChildren: () => import('./pages/intranet/perfil-usuario/perfil-usuario.module').then(mod => mod.PerfilUsuarioModule)
            },
            {
                path: 'emprestimo',
                loadChildren: () => import('./pages/intranet/emprestimo/emprestimo.module').then(mod => mod.EmprestimoModule)
            },
            {
                path: 'obra',
                loadChildren: () => import('./pages/intranet/obra/obra.module').then(mod => mod.ObraModule)
            },
            {
                path: 'usuario',
                loadChildren: () => import('./pages/intranet/usuario/usuario.module').then(mod => mod.UsuarioModule)
            },
            {
                path: 'autor',
                loadChildren: () => import('./pages/intranet/autor/autor.module').then(mod => mod.AutorModule)
            },
            {
                path: 'assunto',
                loadChildren: () => import('./pages/intranet/assunto/assunto.module').then(mod => mod.AssuntoModule)
            },
            {
                path: 'localizacao',
                loadChildren: () => import('./pages/intranet/localizacao/localizacao.module').then(mod => mod.LocalizacaoModule)
            },
        ]
    },
    { path: 'acervo', component: AcervoComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: PageNotFoundComponent },
];