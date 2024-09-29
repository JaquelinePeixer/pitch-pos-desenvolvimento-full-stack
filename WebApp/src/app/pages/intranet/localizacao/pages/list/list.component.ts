import { Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { LoadingService } from '@shared/loading/loading.service';
import { LocalizacaoService } from '@service/localizacao/localizacao.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Localizacao } from '@service/localizacao/localizacao';
import { AlertModalService } from '@service/alert-modal/alert-modal.service';
import { PaginatorComponent } from '@app/shared/paginator/paginator.component';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends PaginatorComponent {
  tableData: Localizacao[] = [];
  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: null
    },
    {
      title: 'localizacao.page.title',
      action: null
    }
  ];

  constructor(
    private loadingService: LoadingService,
    private localizacaoService: LocalizacaoService,
    private router: Router,
    private toastErrorService: ToastErrorService,
    private alertService: AlertModalService
  ) {
    super();
  }

  fetch(event?: number) {
    this.loadingService.startLoadind();
    this.localizacaoService.get(event, this.search)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: result => {
          this.tableData = result.content;
          this.totalRecords = result.totalElements;
        },
        error: error => this.toastErrorService.alertError(error)
      })
  }

  edit(item?: any) {
    this.router.navigate([`${AppMenuModel.menuLocalizacao.routerLink}/edit/${item.id}`])
  }

  remover(item?: any) {
    this.loadingService.startLoadind();
    this.localizacaoService.delete(item.id)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: any) => {
          this.alertService.defaultSuccess(result.message);
          this.fetch();
        },
        error: error => this.toastErrorService.alertError(error)
      })
  }

}
