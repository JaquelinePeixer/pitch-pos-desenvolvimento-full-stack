import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './pages/new/new.component';
import { ListComponent } from './pages/list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { AutorRoutingModule } from './autor-routing.module';
import { AutorService } from '../../../service/autor/autor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { EditComponent } from './pages/edit/edit.component';
import { FormComponent } from './components/form/form.component';
import { FilterComponent } from './components/filter/filter.component';


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
    AutorRoutingModule,
    TranslateModule,
    SharedModule
  ],
  providers: [AutorService]
})
export class AutorModule { }
