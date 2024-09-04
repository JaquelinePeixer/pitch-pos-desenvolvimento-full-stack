import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { FormComponent } from '../../components/form/form.component';
import { UsuarioService } from '../../../../../service/usuario/usuario.service';
import { Usuario } from '../../../../../service/usuario/usuario';
import { AlertModalService } from '../../../../../service/alert-modal/alert-modal.service';



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
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private usuarioService: UsuarioService,
    private router: Router,
    private alertService: AlertModalService
  ) { }

  ngAfterViewInit(): void {
    this.form.onSubmit = (entity: Usuario) => this.onSubmit(entity);
    this.form.onCancel = () => this.router.navigate([this.menuBack.routerLink]).then();
  }

  onSubmit(entity: Usuario): void {
    this.loadingService.startLoadind();
    this.usuarioService.post(entity)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: any) => {
          this.alertService.defaultSuccess(result)
          this.router.navigate([this.menuBack.routerLink])
        },
        error: error => this.alertService.defaultError(error.message)
      })
  }

}
