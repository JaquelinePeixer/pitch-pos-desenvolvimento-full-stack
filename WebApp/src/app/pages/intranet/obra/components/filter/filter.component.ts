import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      title: [null],
      author: [null]
    })
  }

  filter() {
    this.onSearch.emit(this.formGroupFilter.value)
  }
}
