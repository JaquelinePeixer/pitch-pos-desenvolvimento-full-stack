import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { onlySpaceValidator } from '../../../../../domain/validators/only-space-validaor';

@Component({
  selector: 'app-obra-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() onSearch = new EventEmitter;
  formGroupFilter: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupFilter = this.formBuilder.group({
      id: [null],
      title: [null, [Validators.maxLength(255), onlySpaceValidator]],
      author: [null, [Validators.maxLength(150), onlySpaceValidator]]
    })
  }

  filter() {
    this.onSearch.emit(this.formGroupFilter.value)
  }
}
