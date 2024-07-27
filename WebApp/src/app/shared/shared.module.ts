import { NgModule } from "@angular/core";
import { NavComponent } from "./nav/nav.component";
import { LoadingComponent } from "./loading/loading.component";
import { FooterComponent } from "./footer/footer.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { FormButtonsComponent } from "./form-buttons/form-buttons.component";
import { TranslateModule } from "@ngx-translate/core";
import { AppFilterComponent } from "./filter/filter.component";
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";

@NgModule({
    declarations: [],
    imports: [
        TranslateModule,
        NavComponent,
        LoadingComponent,
        FooterComponent,
        BreadcrumbComponent,
        FormButtonsComponent,
        AppFilterComponent,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        InputNumberModule,
        TableModule
    ],
    exports: [
        TranslateModule,
        NavComponent,
        LoadingComponent,
        FooterComponent,
        BreadcrumbComponent,
        FormButtonsComponent,
        AppFilterComponent,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        InputNumberModule,
        TableModule
    ],
    providers: []
})
export class SharedModule { }
