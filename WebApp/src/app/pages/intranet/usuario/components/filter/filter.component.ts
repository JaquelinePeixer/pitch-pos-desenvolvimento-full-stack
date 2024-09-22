import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { onlySpaceValidator } from '../../../../../domain/validators/only-space-validaor';

@Component({
  selector: 'app-usuario-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() onSearch = new EventEmitter;
  formGroupFilter: FormGroup;

  optionSimNao = [
    {value: true, label: "Sim"},
    {value: false, label: "Não"}
  ]

  constructor(private formBuilder: FormBuilder) {
    this.formGroupFilter = this.formBuilder.group({
      name: [null, [Validators.maxLength(150), onlySpaceValidator]],
      delayedUsers: [null]
    })
  }

  filter() {
    this.onSearch.emit(this.formGroupFilter.value)
  }
}
