import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './pages/new/new.component';
import { ListComponent } from './pages/list/list.component';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { AutorRoutingModule } from './autor-routing.module';
import { AutorService } from '../../../service/autor/autor.service';


@NgModule({
  declarations: [
    NewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    AutorRoutingModule,
    TranslateModule,
    BreadcrumbComponent
  ],
  providers: [
    AutorService
  ]
})
export class AutorModule { }
