import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  constructor(public translate: TranslateService, private messageService: MessageService) { }

  defaultSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: this.translate.instant('toast.success'), detail: msg })
  }

  defaultError(msg: string) {
    this.messageService.add({ severity: 'error', summary: this.translate.instant('toast.error'), detail: msg })
  }

  defaultInfo(msg: string) {
    this.messageService.add({ severity: 'info', summary: this.translate.instant('toast.info'), detail: msg })
  }

  defaultWarning(msg: string) {
    this.messageService.add({ severity: 'warn', summary: this.translate.instant('toast.warning'), detail: msg })
  }

}

