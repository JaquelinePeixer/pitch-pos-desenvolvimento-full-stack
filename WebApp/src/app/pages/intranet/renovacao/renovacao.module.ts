import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { RenovacaoRoutingModule } from './renovacao-routing.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RenovacaoRoutingModule,
    TranslateModule,
    BreadcrumbComponent
  ],
  providers: [
    // LivroService
  ]
})
export class RenovacaoModule { }
