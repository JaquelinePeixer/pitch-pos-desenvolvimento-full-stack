import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './pages/new/new.component';
import { ListComponent } from './pages/list/list.component';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioService } from '../../../service/usuario/usuario.service';


@NgModule({
  declarations: [
    NewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    TranslateModule,
    BreadcrumbComponent
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule { }
