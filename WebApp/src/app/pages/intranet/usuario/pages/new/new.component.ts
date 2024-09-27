import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { LoadingService } from '@shared/loading/loading.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { FormComponent } from '@intranet/usuario/components/form/form.component';
import { Usuario } from '@service/usuario/usuario';
import { AlertModalService } from '@service/alert-modal/alert-modal.service';
import { AuthenticationService } from '@app/authentication/authentication.service';
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
      title: 'usuario.page.title',
      action: AppMenuModel.menuUsuario.routerLink
    },
    {
      title: 'usuario.page.new',
      action: null
    }
  ];

  menuBack = AppMenuModel.menuUsuario

  @ViewChild('form')
  form!: FormComponent

  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private alertService: AlertModalService,
    private toastErrorService: ToastErrorService,
    private authenticationService: AuthenticationService
  ) { }

  ngAfterViewInit(): void {
    this.form.onSubmit = (entity: Usuario) => this.onSubmit(entity);
    this.form.onCancel = () => this.router.navigate([this.menuBack.routerLink]).then();
  }

  onSubmit(entity: Usuario): void {
    this.loadingService.startLoadind();
    this.authenticationService.registerUser(entity)
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
