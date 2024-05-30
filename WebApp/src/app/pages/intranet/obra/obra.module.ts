import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './pages/new/new.component';
import { ListComponent } from './pages/list/list.component';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { ObraRoutingModule } from './obra-routing.module';
import { ObraService } from '../../../service/obra/obra.service';


@NgModule({
  declarations: [
    NewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ObraRoutingModule,
    TranslateModule,
    BreadcrumbComponent
  ],
  providers: [
    ObraService
  ]
})
export class ObraModule { }
