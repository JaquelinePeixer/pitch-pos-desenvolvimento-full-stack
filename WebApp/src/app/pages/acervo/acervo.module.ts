import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AcervoComponent } from './list/acervo.component';
import { FilterComponent } from './filter/filter.component';
import { ObraService } from '@app/service/obra/obra.service';
import { AcervoRoutingModule } from './acervo-routing.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AcervoComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    TableModule,
    AcervoRoutingModule
  ],
  providers: [ObraService]
})
export class AcervoModule { }
