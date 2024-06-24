import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './pages/new/new.component';
import { ListComponent } from './pages/list/list.component';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { AssuntoRoutingModule } from './assunto-routing.module';
import { AssuntoService } from '../../../service/assunto/assunto.service';
import { SharedModule } from '../../../shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { FormComponent } from './components/form/form.component';
import { EditComponent } from './pages/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewComponent,
    ListComponent,
    EditComponent,
    FormComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AssuntoRoutingModule,
    TranslateModule,
    SharedModule
  ],
  providers: [AssuntoService]
})
export class AssuntoModule { }
