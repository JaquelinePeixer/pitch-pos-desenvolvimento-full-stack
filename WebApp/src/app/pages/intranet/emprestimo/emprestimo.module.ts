import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './pages/new/new.component';
import { TranslateModule } from '@ngx-translate/core';
import { EmprestimoRoutingModule } from './emprestimo-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmprestimoService } from '@app/service/emprestimo/emprestimo.service';


@NgModule({
  declarations: [
    NewComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    EmprestimoRoutingModule,
    TranslateModule
  ],
  providers: [
    EmprestimoService
  ]
})
export class EmprestimoModule { }
