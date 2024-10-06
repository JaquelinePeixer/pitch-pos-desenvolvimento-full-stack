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
    private usuarioService: UsuarioService
  ) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      cpf: [[Validators.required]],
      name: [null],
      book: [null, [Validators.required]]
    })
  }

  emprestimo() {
    debugger
    // this.onSubmit(this.formGroup.value)
  }

  devolucao() {
    debugger
    // this.onCancel()
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
          next: result => this.formGroup.controls['name'].setValue(result.name),
          error: error => this.toastErrorService.alertError(error)
        })
    }
  }

}
