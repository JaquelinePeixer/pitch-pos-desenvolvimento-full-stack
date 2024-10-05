import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { LoadingService } from '@shared/loading/loading.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { FormComponent } from '../../components/form/form.component';
import { AlertModalService } from '@service/alert-modal/alert-modal.service';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';
import { Emprestimo } from '@app/service/emprestimo/emprestimo';
import { EmprestimoService } from '@app/service/emprestimo/emprestimo.service';

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
      title: 'emprestimo.page.title',
      action: AppMenuModel.menuEmprestimo.routerLink
    },
    {
      title: 'emprestimo.page.new',
      action: null
    }
  ];

  menuBack = AppMenuModel.menuAutor

  @ViewChild('form') 
  form!: FormComponent

  constructor(
    private loadingService: LoadingService,
    private emprestimoService: EmprestimoService,
    private router: Router,
    private toastErrorService: ToastErrorService,
    private alertService: AlertModalService
  ) { }

  ngAfterViewInit(): void {
    this.form.onSubmit = (entity: Emprestimo) => this.onSubmit(entity);
    this.form.onCancel = () => this.router.navigate([this.menuBack.routerLink]).then();
  }

  onSubmit(entity: Emprestimo): void {
    this.loadingService.startLoadind();
    this.emprestimoService.post(entity)
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
