import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RenovacaoRoutingModule } from './renovacao-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './pages/edit/edit.component';
import { FormComponent } from './components/form/form.component';
import { EmprestimoService } from '@app/service/emprestimo/emprestimo.service';
import { AutoCompleteModule } from 'primeng/autocomplete';


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
    ReactiveFormsModule,
    AutoCompleteModule
  ],
  providers: [
    EmprestimoService
  ]
})
export class RenovacaoModule { }
