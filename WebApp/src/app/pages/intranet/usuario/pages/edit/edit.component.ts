import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { FormComponent } from '@intranet/usuario/components/form/form.component';
import { LoadingService } from '@shared/loading/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UsuarioService } from '@service/usuario/usuario.service';
import { Usuario } from '@service/usuario/usuario';
import { AlertModalService } from '@service/alert-modal/alert-modal.service';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit, AfterViewInit {
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

  private id!: number;

  @ViewChild('form')
  form!: FormComponent;

  constructor(
    private loadingService: LoadingService,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastErrorService: ToastErrorService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertModalService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.loadingService.startLoadind();
    this.usuarioService.getId(this.id)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: Usuario) => this.form.patchValue(result),
        error: error => this.toastErrorService.alertError(error)
      })
  }

  ngAfterViewInit(): void {
    this.form.onSubmit = (entity: Usuario) => this.submit(entity);
    this.form.onCancel = () => this.router.navigate([this.menuBack.routerLink]).then();
  }

  submit(entity: Usuario): void {
    this.loadingService.startLoadind();
    this.usuarioService.put(this.id, entity)
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
