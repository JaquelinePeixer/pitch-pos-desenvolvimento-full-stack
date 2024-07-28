import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-form-buttons',
  standalone: true,
  imports: [ConfirmDialogModule, TranslateModule],
  templateUrl: './form-buttons.component.html',
  styleUrl: './form-buttons.component.scss'
})
export class FormButtonsComponent {
  @Input() item: any;
  @Input() showEdit = true;
  @Input() showDelete = true;
  @Input() page = '';
  @Output() onDelete: EventEmitter<void> = new EventEmitter();
  @Output() onEdit: EventEmitter<void> = new EventEmitter();

  constructor(private confirmationService: ConfirmationService, private translateService: TranslateService) { }

  edit() {
    this.onEdit.emit(this.item)
  }

  delete() {
    this.confirmationService.confirm({
      message: this.translateService.instant(`${this.page}.message.confirmation_remove`),
      header: this.translateService.instant('action.excluir'),
      icon: 'pi pi-info-circle',
      accept: () => {
        this.onDelete.emit(this.item)
      }
    });
  }
}
