import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { UsuarioService } from '../../../service/usuario/usuario.service';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PerfilUsuarioRoutingModule,
    TranslateModule,
    BreadcrumbComponent
  ],
  providers: [
    UsuarioService
  ]
})
export class PerfilUsuarioModule { }
