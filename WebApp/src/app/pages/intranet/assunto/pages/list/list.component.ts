import { Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { AssuntoService } from '../../../../../service/assunto/assunto.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Assunto } from '../../../../../service/assunto/assunto';
import { AlertModalService } from '../../../../../service/alert-modal/alert-modal.service';
import { PaginationComponent } from '../../../../../shared/pagination/pagination.component';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  tableData: Assunto[] = [];

  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: AppMenuModel.menuIntranet.routerLink
    },
    {
      title: 'assunto.page.title',
      action: null
    }
  ];

  @ViewChild('pagination')
  pagination: PaginationComponent;

  search: any;

  constructor(
    private loadingService: LoadingService,
    private assuntoService: AssuntoService,
    private router: Router,
    private alertService: AlertModalService
  ) {
    this.fetch();
  }

  fetch(event?: number) {
    this.loadingService.startLoadind();
    this.assuntoService.get(event, this.search)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: result => {
          this.tableData = result.content;
          if (event === undefined || event === null) {
            this.pagination.createdPages({
              pageNumber: result.number,
              pageSize: result.size,
              totalPages: result.totalPages,
              totalElements: result.totalElements
            })
          }
        },
        error: error => this.alertService.defaultError(error.message)
      })
  }

  edit(item?: any) {
    this.router.navigate([`${AppMenuModel.menuAssunto.routerLink}/edit/${item.id}`])
  }

  remover(item?: any) {
    this.loadingService.startLoadind();
    this.assuntoService.delete(item.id)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: any) => {
          this.alertService.defaultSuccess(result.message);
          this.fetch();
        },
        error: error => this.alertService.defaultError(error.error.message)
      })
  }

  filter(params: any) {
    this.search = params;
    this.fetch();
  }
}
