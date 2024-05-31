import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { ObraEmprestadaRoutingModule } from './obra-emprestada-routing.module';
import { ObraService } from '../../../service/obra/obra.service';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ObraEmprestadaRoutingModule,
    TranslateModule,
    BreadcrumbComponent
  ],
  providers: [
    ObraService
  ]
})
export class ObraEmprestadaModule { }
