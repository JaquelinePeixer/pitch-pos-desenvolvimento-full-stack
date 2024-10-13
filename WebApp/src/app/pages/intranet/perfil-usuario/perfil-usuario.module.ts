import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { UsuarioService } from '@service/usuario/usuario.service';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { EditComponent } from './pages/edit/edit.component';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [
    EditComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PerfilUsuarioRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    InputMaskModule
  ],
  providers: [
    UsuarioService
  ]
})
export class PerfilUsuarioModule { }
