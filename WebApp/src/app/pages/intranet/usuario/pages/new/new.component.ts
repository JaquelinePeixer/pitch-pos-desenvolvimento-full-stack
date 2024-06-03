import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { FormComponent } from '../../components/form/form.component';
import { UsuarioService } from '../../../../../service/usuario/usuario.service';
import { Usuario } from '../../../../../service/usuario/usuario';



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
      action: AppMenuModel.menuIntranet.routerLink
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
    private router: Router
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
        next: () => {
          this.router.navigate([this.menuBack.routerLink])
          alert('success')
        },
        error: error => {
          alert(error.message)
        }
      })
  }

}
