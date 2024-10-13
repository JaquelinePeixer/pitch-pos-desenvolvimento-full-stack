import { Component, Input } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Emprestimo } from '@app/service/emprestimo/emprestimo';
import { ObraService } from '@app/service/obra/obra.service';
import { LoadingService } from '@app/shared/loading/loading.service';
import { finalize } from 'rxjs';
import { Obra } from '@app/service/obra/obra';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';
import { UsuarioService } from '@app/service/usuario/usuario.service';
import { AlertModalService } from '@app/service/alert-modal/alert-modal.service';
import { EmprestimoService } from '@app/service/emprestimo/emprestimo.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() isNew?: boolean;

  menuBack = AppMenuModel.menuEmprestimo;
  formGroup: FormGroup;
  optionObra: Obra[] = [];

  onSubmit!: (entity: Emprestimo) => void;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private obraService: ObraService,
    private toastErrorService: ToastErrorService,
    private usuarioService: UsuarioService,
    private emprestimoService: EmprestimoService,
    private alertService: AlertModalService
  ) {
    this.formGroup = this.formBuilder.group({
      cpf: [[Validators.required]],
      user: [[Validators.required]],
      name: [null],
      book: [null, [Validators.required]]
    })
  }

  emprestimo() {
    if (this.formGroup.valid) {
      this.onSubmit(this.formGroup.value)
    }
    else {
      this.alertService.defaultError('Formulário inválido')
    }
  }

  devolucao() {
    this.loadingService.startLoadind();
    this.emprestimoService.devolucao(this.formGroup.value)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: result => this.alertService.defaultSuccess(result.message),
        error: error => this.toastErrorService.alertError(error)
      })
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  patchValue(entity: Emprestimo): void {
    if (entity != null) {
      this.formGroup.patchValue(entity);
    }
  }

  searchObras(value: any) {
    if (value.query.length > 2) {
      this.loadingService.startLoadind();
      this.obraService.getList(value.query)
        .pipe(finalize(() => this.loadingService.stopLoadind()))
        .subscribe({
          next: result => this.optionObra = result,
          error: error => this.toastErrorService.alertError(error)
        })
    }
  }

  searchUsuario(event: any) {
    if (event.target.value) {
      this.loadingService.startLoadind();
      this.usuarioService.getByCpf(event.target.value)
        .pipe(finalize(() => this.loadingService.stopLoadind()))
        .subscribe({
          next: result => {
            this.formGroup.controls['name'].setValue(result.name)
            this.formGroup.controls['user'].setValue(result)
          },
          error: error => this.toastErrorService.alertError(error)
        })
    }
  }

}
