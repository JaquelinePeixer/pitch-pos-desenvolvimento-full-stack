import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './pages/new/new.component';
import { ListComponent } from './pages/list/list.component';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { EmprestimoRoutingModule } from './emprestimo-routing.module';


@NgModule({
  declarations: [
    NewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    EmprestimoRoutingModule,
    TranslateModule,
    BreadcrumbComponent
  ],
  providers: [
    // EmprestimoService
  ]
})
export class EmprestimoModule { }
