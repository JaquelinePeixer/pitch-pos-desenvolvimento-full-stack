import { Component, Input } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Autor } from '@service/autor/autor';
import { onlySpaceValidator } from '@domain/validators/only-space-validaor';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() isNew?: boolean;

  menuBack = AppMenuModel.menuAutor;
  formGroup: FormGroup;

  onSubmit!: (entity: Autor) => void;
  onCancel!: () => void;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(150), onlySpaceValidator]],
      birthYear: [null, [Validators.required]],
      deathhYear: [null]
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

  patchValue(entity: Autor): void {
    if (entity != null) {
      this.formGroup.patchValue(entity);
      if (entity.deathhYear) this.formGroup.controls['deathhYear'].setValue(new Date(entity.deathhYear));
      if (entity.birthYear) this.formGroup.controls['birthYear'].setValue(new Date(entity.birthYear));
    }
  }

}
