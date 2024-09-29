import { Component } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { AutorService } from '@service/autor/autor.service';
import { LoadingService } from '@shared/loading/loading.service';
import { finalize } from 'rxjs';
import { Autor } from '@service/autor/autor';
import { Router } from '@angular/router';
import { AlertModalService } from '@service/alert-modal/alert-modal.service';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';
import { PaginatorComponent } from '@app/shared/paginator/paginator.component';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends PaginatorComponent {
  tableData: Autor[] = [];
  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: null
    },
    {
      title: 'autor.page.title',
      action: null
    }
  ];

  constructor(
    private loadingService: LoadingService,
    private autorService: AutorService,
    private router: Router,
    private toastErrorService: ToastErrorService,
    private alertService: AlertModalService
  ) {
    super();
  }

  fetch(event?: number) {
    this.loadingService.startLoadind();
    this.autorService.get(event, this.search)
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
    this.router.navigate([`${AppMenuModel.menuAutor.routerLink}/edit/${item.id}`])
  }

  remover(item?: any) {
    this.loadingService.startLoadind();
    this.autorService.delete(item.id)
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
