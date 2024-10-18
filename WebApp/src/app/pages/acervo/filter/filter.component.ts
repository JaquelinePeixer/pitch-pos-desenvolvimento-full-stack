import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from '@app/service/alert-modal/alert-modal.service';
import { onlySpaceValidator } from '@domain/validators/only-space-validaor';

@Component({
  selector: 'app-acervo-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() onSearch = new EventEmitter;
  formGroupFilter: FormGroup;

  tipoObra = [
    { value: 'subject', label: 'Assunto' },
    { value: 'author', label: 'Autor' },
    { value: 'title', label: 'Título' }
  ];

  constructor(private formBuilder: FormBuilder, private alertService: AlertModalService) {
    this.formGroupFilter = this.formBuilder.group({
      tipo: [null, [Validators.required]],
      name: [null, [Validators.maxLength(150), onlySpaceValidator]]
    })
  }

  filter() {
    if (this.formGroupFilter.valid) {
      this.onSearch.emit(this.formGroupFilter.value)
    } else {
      this.alertService.defaultError('Favor selecione os campos')
    }
  }
}
