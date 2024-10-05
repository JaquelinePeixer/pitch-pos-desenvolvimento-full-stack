import { Component, Input } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Emprestimo } from '@app/service/emprestimo/emprestimo';

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

  onSubmit!: (entity: Emprestimo) => void;
  onCancel!: () => void;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      cpf: [[Validators.required]],
      name: [null],
      book: [null, [Validators.required]]
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

  patchValue(entity: Emprestimo): void {
    if (entity != null) {
      this.formGroup.patchValue(entity);
    }
  }

}
