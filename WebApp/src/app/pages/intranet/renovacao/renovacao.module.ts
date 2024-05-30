import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { RenovacaoRoutingModule } from './renovacao-routing.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    RenovacaoRoutingModule,
    TranslateModule,
    BreadcrumbComponent
  ],
  providers: [
    // LivroService
  ]
})
export class RenovacaoModule { }
