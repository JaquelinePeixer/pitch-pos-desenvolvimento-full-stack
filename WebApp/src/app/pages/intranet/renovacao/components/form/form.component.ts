import { Component, Input } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Renovacao } from '../../../../../service/renovacao/renovacao';
import { Obra } from '../../../../../service/obra/obra';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() isNew?: boolean;

  optionObra:Obra[];
  menuBack = AppMenuModel.menuRenovacao;
  formGroup: FormGroup;

  onSubmit!: (entity: Renovacao) => void;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      idUser: [null, [Validators.required]],
      obra: [null, [Validators.required]]
    })
    this.getObrasUsuario()
  }

  submit() {
    this.onSubmit(this.formGroup.value)
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  getObrasUsuario(){
    // Todo
  }

}
