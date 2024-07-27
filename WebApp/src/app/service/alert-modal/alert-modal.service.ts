import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  title = {
    error: this.translate.instant('toast.error'),
    info: this.translate.instant('toast.info'),
    success: this.translate.instant('toast.success'),
    warning: this.translate.instant('toast.warning'),
  };

  constructor(public translate: TranslateService, private messageService: MessageService) { }

  defaultSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: this.title.success, detail: msg })
  }

  defaultError(msg: string) {
    this.messageService.add({ severity: 'error', summary: this.title.error, detail: msg })
  }

  defaultInfo(msg: string) {
    this.messageService.add({ severity: 'info', summary: this.title.info, detail: msg })
  }

  defaultWarning(msg: string) {
    this.messageService.add({ severity: 'warn', summary: this.title.warning, detail: msg })
  }

}

