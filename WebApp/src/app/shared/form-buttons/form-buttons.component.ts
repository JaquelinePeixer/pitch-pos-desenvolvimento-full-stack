import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-buttons',
  standalone: true,
  imports: [],
  templateUrl: './form-buttons.component.html',
  styleUrl: './form-buttons.component.scss'
})
export class FormButtonsComponent {
  @Input() item: any;
  @Input() showEdit = true;
  @Input() showDelete = true;
  @Output() onDelete: EventEmitter<void> = new EventEmitter();
  @Output() onEdit: EventEmitter<void> = new EventEmitter();

  edit() {
    this.onEdit.emit(this.item)
  }

  delete() {
    this.onDelete.emit(this.item)
  }
}
