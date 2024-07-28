import { Component, Input, OnInit } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../../../service/usuario/usuario';
import { onlySpaceValidator } from '../../../../../domain/validators/only-space-validaor';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  @Input() isNew?: boolean;

  menuBack = AppMenuModel.menuUsuario;
  formGroup: FormGroup;

  onSubmit!: (entity: Usuario) => void;
  onCancel!: () => void;

  optionAccessLevel = [];

  optionSituationUser = [
    { value: true, label: "Ativo" },
    { value: false, label: "Inativo" }
  ]

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(150), onlySpaceValidator]],
      birthDate: [null, [Validators.required]],
      email: [null, [Validators.email, onlySpaceValidator]],
      accessLevel: [null],
      cpf: [null],
      situationUser: [{ value: true, label: "Ativo" }]
    })
  }

  ngOnInit(): void {
    //get nivel acesso
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
