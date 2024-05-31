import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-autor-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  formGroupFilter: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupFilter = this.formBuilder.group({
      name: [null]
    })
  }

  filter() {
    debugger
  }
}
