import { Component, Input } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Localizacao } from '@service/localizacao/localizacao';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() isNew?: boolean;

  menuBack = AppMenuModel.menuLocalizacao;
  formGroup: FormGroup;

  onSubmit!: (entity: Localizacao) => void;
  onCancel!: () => void;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      floor: [null, [Validators.required, Validators.max(9)]],
      section: [null, [Validators.required]],
      initialBookcase: [null, [Validators.required]],
      finalBookcase: [null]
    })
  }

  submit() {
    this.validateBookCase()
    if (this.formGroup.valid) {
      this.onSubmit(this.formGroup.value)
    }
  }

  validateBookCase() {
    const initial = this.formGroup.controls['initialBookcase'].value;
    const final = this.formGroup.controls['finalBookcase'].value;
    if (final && initial > final) {
      this.formGroup.controls['initialBookcase'].setErrors({ INITIAL_MORE_FINAL: true })
    } else {
      if (this.formGroup.controls['initialBookcase'].hasError('INITIAL_MORE_FINAL')) {
        this.formGroup.controls['initialBookcase'].setErrors(null)
      }
    }
  }

  cancel() {
    this.onCancel()
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  patchValue(entity: Localizacao): void {
    if (entity != null) {
      this.formGroup.patchValue(entity);
      this.formGroup.controls['initialBookcase'].setValue(entity.bookcase);
    }
  }

}
