import { Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { AutorService } from '../../../../../service/autor/autor.service';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { finalize } from 'rxjs';
import { Autor } from '../../../../../service/autor/autor';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../../../shared/pagination/pagination.component';
import { AlertModalService } from '../../../../../service/alert-modal/alert-modal.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  tableData: Autor[] = [];

  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: AppMenuModel.menuIntranet.routerLink
    },
    {
      title: 'autor.page.title',
      action: null
    }
  ];

  @ViewChild('pagination')
  pagination: PaginationComponent;

  search: any;

  constructor(
    private loadingService: LoadingService,
    private autorService: AutorService,
    private router: Router,
    private alertService: AlertModalService
  ) {
    this.fetch();
  }

  fetch(event?: number) {
    this.loadingService.startLoadind();
    this.autorService.get(event, this.search)
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
    this.router.navigate([`${AppMenuModel.menuAutor.routerLink}/edit/${item.id}`])
  }

  remover(item?: any) {
    this.loadingService.startLoadind();
    this.autorService.delete(item.id)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: any) => {
          this.alertService.defaultSuccess(result);
          this.fetch();
        },
        error: error => this.alertService.defaultError(error.message)
      })
  }

  filter(params: any) {
    this.search = params;
    this.fetch();
  }
}
