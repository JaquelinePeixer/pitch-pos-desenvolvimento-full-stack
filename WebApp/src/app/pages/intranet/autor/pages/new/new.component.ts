import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { LoadingService } from '@shared/loading/loading.service';
import { AutorService } from '@service/autor/autor.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { FormComponent } from '@intranet/autor/components/form/form.component';
import { Autor } from '@service/autor/autor';
import { AlertModalService } from '@service/alert-modal/alert-modal.service';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';


@Component({
  selector: 'app-new',
  standalone: false,
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent implements AfterViewInit {
  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: null
    },
    {
      title: 'autor.page.title',
      action: AppMenuModel.menuAutor.routerLink
    },
    {
      title: 'autor.page.new',
      action: null
    }
  ];

  menuBack = AppMenuModel.menuAutor

  @ViewChild('form')
  form!: FormComponent

  constructor(
    private loadingService: LoadingService,
    private autorService: AutorService,
    private router: Router,
    private toastErrorService: ToastErrorService,
    private alertService: AlertModalService
  ) { }

  ngAfterViewInit(): void {
    this.form.onSubmit = (entity: Autor) => this.onSubmit(entity);
    this.form.onCancel = () => this.router.navigate([this.menuBack.routerLink]).then();
  }

  onSubmit(entity: Autor): void {
    this.loadingService.startLoadind();
    this.autorService.post(entity)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: any) => {
          this.alertService.defaultSuccess(result.message)
          this.router.navigate([this.menuBack.routerLink])
        },
        error: error => this.toastErrorService.alertError(error)
      })
  }

}
