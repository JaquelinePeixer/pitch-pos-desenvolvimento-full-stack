import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  configDefault = {
    timeOut: 3000,
    closeButton: true,
    toastClass: 'yourclass ngx-toastr'
  }

  title = {
    error: this.translate.instant('toast.error'),
    info: this.translate.instant('toast.info'),
    success: this.translate.instant('toast.success'),
    warning: this.translate.instant('toast.warning'),
  };

  constructor(private toastr: ToastrService, public translate: TranslateService) { }

  defaultSuccess(msg: string) {
    this.toastr.success(msg, this.title.success, this.configDefault);
  }

  defaultError(msg: string) {
    this.toastr.error(msg, this.title.error, this.configDefault);
  }

  defaultInfo(msg: string) {
    this.toastr.info(msg, this.title.success, this.configDefault);
  }

  defaultWarning(msg: string) {
    this.toastr.warning(msg, this.title.error, this.configDefault);
  }

}

