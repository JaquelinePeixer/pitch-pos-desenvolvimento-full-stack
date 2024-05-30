import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { UsuarioService } from '../../../service/usuario/usuario.service';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    PerfilUsuarioRoutingModule,
    TranslateModule,
    BreadcrumbComponent
  ],
  providers: [
    UsuarioService
  ]
})
export class PerfilUsuarioModule { }
