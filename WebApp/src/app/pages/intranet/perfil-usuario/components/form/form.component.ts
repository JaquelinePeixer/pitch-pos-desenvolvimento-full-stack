import { Component, Input } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../../../service/usuario/usuario';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() isNew?: boolean;

  menuBack = AppMenuModel.menuPerfilUsuario;
  formGroup: FormGroup;

  onSubmit!: (entity: Usuario) => void;
  onCancel!: () => void;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(150)]],
      email: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      cpf: [null, [Validators.required]]
    })
  }

  submit() {
    this.onSubmit(this.formGroup.value)
  }

  cancel() {
    this.onCancel()
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  patchValue(entity: Usuario): void {
    if (entity != null) {
      this.formGroup.patchValue(entity);
    }
  }

}
