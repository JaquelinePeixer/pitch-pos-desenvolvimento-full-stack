import { NgModule } from "@angular/core";
import { NavComponent } from "./nav/nav.component";
import { LoadingComponent } from "./loading/loading.component";
import { FooterComponent } from "./footer/footer.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { FormButtonsComponent } from "./form-buttons/form-buttons.component";
import { TranslateModule } from "@ngx-translate/core";
import { AppFilterComponent } from "./filter/filter.component";

@NgModule({
    declarations: [],
    imports: [
        TranslateModule,
        NavComponent,
        LoadingComponent,
        FooterComponent,
        BreadcrumbComponent,
        FormButtonsComponent,
        AppFilterComponent
    ],
    exports: [
        TranslateModule,
        NavComponent,
        LoadingComponent,
        FooterComponent,
        BreadcrumbComponent,
        FormButtonsComponent,
        AppFilterComponent
    ],
    providers: []
})
export class SharedModule { }
