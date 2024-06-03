import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RenovacaoRoutingModule } from './renovacao-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './pages/edit/edit.component';
import { FormComponent } from './components/form/form.component';


@NgModule({
  declarations: [
    EditComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RenovacaoRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  providers: [
    // LivroService
  ]
})
export class RenovacaoModule { }
