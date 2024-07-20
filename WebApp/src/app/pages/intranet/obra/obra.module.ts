import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './pages/new/new.component';
import { ListComponent } from './pages/list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { ObraRoutingModule } from './obra-routing.module';
import { ObraService } from '../../../service/obra/obra.service';
import { SharedModule } from '../../../shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { FormComponent } from './components/form/form.component';
import { EditComponent } from './pages/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';

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
        ObraRoutingModule,
        TranslateModule,
        SharedModule,
        AutoCompleteModule,
        DropdownModule
    ],
    providers: [ObraService]
})
export class ObraModule { }
