import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from '@service/alert-modal/alert-modal.service';
import { onlySpaceValidator } from '@domain/validators/only-space-validaor';

@Component({
  selector: 'app-autor-filter',
  standalone: false,  
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() onSearch = new EventEmitter;
  formGroupFilter: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertModalService
  ) {
    this.formGroupFilter = this.formBuilder.group({
      name: [null, [Validators.maxLength(150), onlySpaceValidator]]
    })
  }

  filter() {
    if (this.formGroupFilter.value.length > 0) {
      this.onSearch.emit(this.formGroupFilter.value)
    } else {
      this.alertService.defaultWarning('Favor digitar algo')
    }
  }
}
