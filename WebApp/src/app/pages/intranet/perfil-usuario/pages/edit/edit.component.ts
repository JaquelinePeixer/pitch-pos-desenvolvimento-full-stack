import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { FormComponent } from '../../components/form/form.component';
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
      title: 'perfil-usuario.page.new',
      action: null
    }
  ];

  id: string | undefined;

  @ViewChild('form')
  form!: FormComponent;

  constructor(
    private loadingService: LoadingService,
    private usuarioService: UsuarioService,
    private alertService: AlertModalService,
    private toastErrorService: ToastErrorService
  ) {
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.loadingService.startLoadind();
    this.usuarioService.getByToken()
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: Usuario) => {
          this.form.patchValue(result);
          this.id = result.id;
        },
        error: error => this.toastErrorService.alertError(error)
      })
  }

  ngAfterViewInit(): void {
    this.form.onSubmit = (entity: Usuario) => this.submit(entity);
  }

  submit(entity: Usuario): void {
    this.loadingService.startLoadind();
    this.usuarioService.put(entity.id, entity)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: any) => {
          this.alertService.defaultSuccess(result)
        },
        error: error => this.toastErrorService.alertError(error)
      })
  }
}
