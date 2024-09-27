import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertModalService } from '../alert-modal/alert-modal.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToastErrorService {

  constructor(
    public translate: TranslateService,
    private alertService: AlertModalService
  ) { }

  alertError(error: HttpErrorResponse) {
    let msg = error.message;

    if (error.status == 403)
      msg = this.translate.instant(`toast.msg-error.${error.status}`);

    this.alertService.defaultError(msg);
  }
}

