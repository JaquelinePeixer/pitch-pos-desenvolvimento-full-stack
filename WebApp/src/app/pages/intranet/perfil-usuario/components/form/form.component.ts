import { Component, Input } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '@service/usuario/usuario';
import { onlySpaceValidator } from '@app/domain/validators/only-space-validaor';

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

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(150), onlySpaceValidator]],
      birthDate: [null, [Validators.required]],
      email: [null, [Validators.email, onlySpaceValidator]],
      role: [null],
      cpf: [{ value: null, disabled: true }],
    })
  }

  submit() {
    this.onSubmit(this.formGroup.value)
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  patchValue(entity: Usuario): void {
    if (entity != null) {
      this.formGroup.patchValue(entity);
      if (entity.birthDate) this.formGroup.controls['birthDate'].setValue(new Date(entity.birthDate));
    }
  }

}
