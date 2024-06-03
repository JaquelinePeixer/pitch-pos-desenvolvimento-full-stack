import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assunto-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  formGroupFilter: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupFilter = this.formBuilder.group({
      name: [null, [Validators.maxLength(150)]]
    })
  }

  filter() {
    debugger
  }
}
