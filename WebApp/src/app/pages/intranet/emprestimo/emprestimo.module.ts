import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './pages/new/new.component';
import { ListComponent } from './pages/list/list.component';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { EmprestimoRoutingModule } from './emprestimo-routing.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    NewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmprestimoRoutingModule,
    TranslateModule,
    BreadcrumbComponent
  ],
  providers: [
    // EmprestimoService
  ]
})
export class EmprestimoModule { }
