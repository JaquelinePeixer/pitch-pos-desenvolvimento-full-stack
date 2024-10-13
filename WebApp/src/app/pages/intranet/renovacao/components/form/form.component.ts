import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Renovacao } from '@service/renovacao/renovacao';
import { Obra } from '@service/obra/obra';
import { ObraService } from '@app/service/obra/obra.service';
import { LoadingService } from '@app/shared/loading/loading.service';
import { finalize } from 'rxjs';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() isNew?: boolean;

  formGroup: FormGroup;
  optionObra: Obra[] = [];

  onSubmit!: (entity: Renovacao) => void;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private obraService: ObraService,
    private toastErrorService: ToastErrorService
  ) {
    this.formGroup = this.formBuilder.group({
      book: [null, [Validators.required]]
    })
  }

  submit() {
    this.onSubmit(this.formGroup.value)
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
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

}
