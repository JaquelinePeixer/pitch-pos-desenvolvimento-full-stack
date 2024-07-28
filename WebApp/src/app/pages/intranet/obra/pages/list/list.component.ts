import { Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Obra } from '../../../../../service/obra/obra';
import { ObraService } from '../../../../../service/obra/obra.service';
import { AlertModalService } from '../../../../../service/alert-modal/alert-modal.service';
import { PageSize } from '../../../../../domain/pagination/pagesize.enum';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  tableData: Obra[] = [];
  search: any;
  pageSize = PageSize.sizeDefault;

  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: AppMenuModel.menuIntranet.routerLink
    },
    {
      title: 'obra.page.title',
      action: null
    }
  ];

  constructor(
    private loadingService: LoadingService,
    private obraService: ObraService,
    private router: Router,
    private alertService: AlertModalService
  ) {
    this.fetch();
  }

  fetch(event?: number) {
    this.loadingService.startLoadind();
    this.obraService.get(event, this.search)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: result => {
          this.tableData = result.content;
        },
        error: error => this.alertService.defaultError(error.message)
      })
  }

  edit(item?: any) {
    this.router.navigate([`${AppMenuModel.menuObra.routerLink}/edit/${item.id}`])
  }

  remover(item?: any) {
    this.loadingService.startLoadind();
    this.obraService.delete(item.id)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: any) => {
          this.alertService.defaultSuccess(result.message);
          this.fetch();
        },
        error: error => this.alertService.defaultError(error.error.message)
      })
  }

  filter(params: Obra) {
    this.search = {};
    if (params.title != null) {
      this.search.title = params.title;
    }
    if (params.id != null) {
      this.search.id = params.id;
    }
    if (params.author != null) {
      this.search.author_id = params.author?.id;
    }
    this.fetch();
  }
}
