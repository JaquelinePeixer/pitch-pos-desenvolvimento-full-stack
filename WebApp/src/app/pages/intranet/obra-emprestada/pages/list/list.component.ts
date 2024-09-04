import { Component } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { Obra } from '../../../../../service/obra/obra';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { AutorService } from '../../../../../service/autor/autor.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
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
  pageSize = PageSize.sizeDefault;
  
  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: null
    },
    {
      title: 'obra-emprestada.page.title',
      action: null
    }
  ];

  constructor(
    private loadingService: LoadingService,
    private autorService: AutorService,
    private router: Router,
    private alertService: AlertModalService
  ) {
    this.fetch();
  }

  fetch() {
    this.loadingService.startLoadind();
    this.autorService.get()
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: result => {
          this.tableData = result;
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
          this.alertService.defaultSuccess(result)
          this.fetch();
        },
        error: error => this.alertService.defaultError(error.message)
      })
  }
}
