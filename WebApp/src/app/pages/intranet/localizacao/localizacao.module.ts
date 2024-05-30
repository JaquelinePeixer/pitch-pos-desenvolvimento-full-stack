import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './pages/new/new.component';
import { ListComponent } from './pages/list/list.component';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizacaoRoutingModule } from './localizacao-routing.module';
import { LocalizacaoService } from '../../../service/localizacao/localizacao.service';


@NgModule({
  declarations: [
    NewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    LocalizacaoRoutingModule,
    TranslateModule,
    BreadcrumbComponent
  ],
  providers: [
    LocalizacaoService
  ]
})
export class LocalizacaoModule { }
