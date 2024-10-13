import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { FormComponent } from '../../components/form/form.component';
import { LoadingService } from '@shared/loading/loading.service';
import { AlertModalService } from '@service/alert-modal/alert-modal.service';
import { Renovacao } from '@service/renovacao/renovacao';
import { finalize } from 'rxjs';
import { EmprestimoService } from '@app/service/emprestimo/emprestimo.service';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements AfterViewInit {
  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: null
    },
    {
      title: 'renovacao.page.title',
      action: null
    }
  ];

  menuBack = AppMenuModel.menuRenovacao

  @ViewChild('form')
  form!: FormComponent;

  constructor(
    private loadingService: LoadingService,
    private emprestimoService: EmprestimoService,
    private toastErrorService: ToastErrorService,
    private alertService: AlertModalService
  ) {
  }

  ngAfterViewInit(): void {
    this.form.onSubmit = (entity: Renovacao) => this.submit(entity);
  }

  submit(entity: Renovacao): void {
    this.loadingService.startLoadind();
    this.emprestimoService.putByUser(entity)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result) => {
          this.alertService.defaultSuccess(result.message)
        },
        error: error => this.toastErrorService.alertError(error)
      })
  }
}
