import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './pages/new/new.component';
import { ListComponent } from './pages/list/list.component';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { ObraEmprestadaRoutingModule } from './obra-emprestada-routing.module';
import { ObraService } from '../../../service/obra/obra.service';


@NgModule({
  declarations: [
    NewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ObraEmprestadaRoutingModule,
    TranslateModule,
    BreadcrumbComponent
  ],
  providers: [
    ObraService
  ]
})
export class ObraEmprestadaModule { }
