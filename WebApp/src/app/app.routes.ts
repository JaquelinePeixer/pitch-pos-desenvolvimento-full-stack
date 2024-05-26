import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IntranetComponent } from './pages/intranet/intranet.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RenovacaoComponent } from './pages/intranet/renovacao/renovacao.component';
import { LivroEmprestadoComponent } from './pages/intranet/livro-emprestado/livro-emprestado.component';
import { PerfilUsuarioComponent } from './pages/intranet/perfil-usuario/perfil-usuario.component';
import { AutorComponent } from './pages/intranet/autor/autor.component';
import { LivroComponent } from './pages/intranet/livro/livro.component';
import { EmprestimoComponent } from './pages/intranet/emprestimo/emprestimo.component';
import { LocalizacaoComponent } from './pages/intranet/localizacao/localizacao.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
        path: 'intranet', component: IntranetComponent,
        children: [
            { path: 'renovacao', component: RenovacaoComponent, pathMatch: 'full' },
            { path: 'obras-emprestadas', component: LivroEmprestadoComponent },
            { path: 'perfil-usuario', component: PerfilUsuarioComponent },
            { path: 'autor', component: AutorComponent },
            { path: 'livro', component: LivroComponent },
            { path: 'emprestimo', component: EmprestimoComponent },
            { path: 'livro-emprestado', component: LivroEmprestadoComponent },
            { path: 'localizacao', component: LocalizacaoComponent },
        ]
    },
    { path: 'acervo', component: PageNotFoundComponent },
    { path: '**', component: PageNotFoundComponent },
];
