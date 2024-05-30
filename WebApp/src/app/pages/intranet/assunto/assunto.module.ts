import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './pages/new/new.component';
import { ListComponent } from './pages/list/list.component';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { AssuntoRoutingModule } from './assunto-routing.module';
import { AssuntoService } from '../../../service/assunto/assunto.service';


@NgModule({
  declarations: [
    NewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    AssuntoRoutingModule,
    TranslateModule,
    BreadcrumbComponent
  ],
  providers: [
    AssuntoService
  ]
})
export class AssuntoModule { }
