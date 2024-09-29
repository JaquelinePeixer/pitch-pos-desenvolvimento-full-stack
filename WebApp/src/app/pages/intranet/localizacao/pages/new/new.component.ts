import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { LoadingService } from '@shared/loading/loading.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { FormComponent } from '../../components/form/form.component';
import { LocalizacaoService } from '@service/localizacao/localizacao.service';
import { Localizacao } from '@service/localizacao/localizacao';
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
      title: 'localizacao.page.title',
      action: AppMenuModel.menuLocalizacao.routerLink
    },
    {
      title: 'localizacao.page.new',
      action: null
    }
  ];

  menuBack = AppMenuModel.menuLocalizacao

  @ViewChild('form') 
  form!: FormComponent

  constructor(
    private loadingService: LoadingService,
    private localizacaoService: LocalizacaoService,
    private router: Router,
    private toastErrorService: ToastErrorService,
    private alertService: AlertModalService
  ) { }

  ngAfterViewInit(): void {
    this.form.onSubmit = (entity: Localizacao) => this.onSubmit(entity);
    this.form.onCancel = () => this.router.navigate([this.menuBack.routerLink]).then();
  }

  onSubmit(entity: Localizacao): void {
    this.loadingService.startLoadind();
    this.localizacaoService.post(entity)
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
