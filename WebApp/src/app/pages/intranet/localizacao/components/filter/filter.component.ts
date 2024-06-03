import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-localizacao-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  formGroupFilter: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupFilter = this.formBuilder.group({
      floor: [null],
      section: [null],
      bookcase: [null]
    })
  }

  filter() {
    debugger
  }
}
