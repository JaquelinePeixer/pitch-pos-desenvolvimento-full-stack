import { Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { LocalizacaoService } from '../../../../../service/localizacao/localizacao.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Localizacao } from '../../../../../service/localizacao/localizacao';
import { AlertModalService } from '../../../../../service/alert-modal/alert-modal.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  tableData: Localizacao[] = [];
  search: Localizacao;

  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: AppMenuModel.menuIntranet.routerLink
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
    private alertService: AlertModalService
  ) {
    this.fetch();
  }

  fetch(event?: number) {
    this.loadingService.startLoadind();
    this.localizacaoService.get(event, this.search)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: result => {
          this.tableData = result.content;          
        },
        error: error => this.alertService.defaultError(error.message)
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
        error: error => this.alertService.defaultError(error.error.message)
      })
  }

  filter(params: Localizacao) {
    this.search = {};
    if (params.floor != null) {
      this.search.floor = params.floor;
    }
    if (params.section != null) {
      this.search.section = params.section;
    }
    if (params.bookcase != null) {
      this.search.bookcase = params.bookcase;
    }
    this.fetch();
  }
}
