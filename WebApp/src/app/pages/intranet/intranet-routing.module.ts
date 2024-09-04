import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../authentication/permission.guard';
import { PermissionEnum } from '../../authentication/permission.enum';

const routesIntranet: Routes = [
  {
    path: 'renovacao',
    pathMatch: 'full',
    loadChildren: () => import('./renovacao/renovacao.module').then(mod => mod.RenovacaoModule)
  },
  {
    path: 'obra-emprestada',
    loadChildren: () => import('./obra-emprestada/obra-emprestada.module').then(mod => mod.ObraEmprestadaModule),
    canActivate: [PermissionGuard],
    data: { role: [PermissionEnum.USER] }
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then(mod => mod.PerfilUsuarioModule),
    canActivate: [PermissionGuard],
    data: { role: [PermissionEnum.USER] }
  },
  {
    path: 'emprestimo',
    pathMatch: 'full',
    loadChildren: () => import('./emprestimo/emprestimo.module').then(mod => mod.EmprestimoModule),
    canActivate: [PermissionGuard],
    data: { role: [PermissionEnum.ADMIN, PermissionEnum.LIBRARIAN] }
  },
  {
    path: 'obra',
    loadChildren: () => import('./obra/obra.module').then(mod => mod.ObraModule),
    canActivate: [PermissionGuard],
    data: { role: [PermissionEnum.ADMIN, PermissionEnum.LIBRARIAN] }
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then(mod => mod.UsuarioModule),
    canActivate: [PermissionGuard],
    data: { role: [PermissionEnum.ADMIN, PermissionEnum.LIBRARIAN] }
  },
  {
    path: 'autor',
    loadChildren: () => import('./autor/autor.module').then(mod => mod.AutorModule),
    canActivate: [PermissionGuard],
    data: { role: [PermissionEnum.ADMIN, PermissionEnum.LIBRARIAN] }
  },
  {
    path: 'assunto',
    loadChildren: () => import('./assunto/assunto.module').then(mod => mod.AssuntoModule),
    canActivate: [PermissionGuard],
    data: { role: [PermissionEnum.ADMIN, PermissionEnum.LIBRARIAN] }
  },
  {
    path: 'localizacao',
    loadChildren: () => import('./localizacao/localizacao.module').then(mod => mod.LocalizacaoModule),
    canActivate: [PermissionGuard],
    data: { role: [PermissionEnum.ADMIN, PermissionEnum.LIBRARIAN] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesIntranet)],
  exports: [RouterModule]
})
export class IntranetRoutingModule { }
