import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PaginatorComponent } from '@app/shared/paginator/paginator.component';
import { Obra } from '@app/service/obra/obra';
import { LoadingService } from '@app/shared/loading/loading.service';
import { ObraService } from '@app/service/obra/obra.service';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-acervo',
  standalone: false,
  templateUrl: './acervo.component.html',
  styleUrl: './acervo.component.scss'
})
export class AcervoComponent extends PaginatorComponent {
  tableData: Obra[] = [];
  contentBreadcrumb = [
    {
      title: 'acervo.title',
      action: null
    }
  ];

  constructor(
    private loadingService: LoadingService,
    private obraService: ObraService,
    private router: Router,
    private toastErrorService: ToastErrorService
  ) {
    super();
  }

  override filter(params: any) {
    this.search = {};
    this.search[params.tipo] = params.name;
    this.fetch();
  }

  fetch(event?: number) {
    this.loadingService.startLoadind();
    if (this.search) {
      this.obraService.get(event, this.search)
        .pipe(finalize(() => this.loadingService.stopLoadind()))
        .subscribe({
          next: result => {
            this.tableData = result.content;
            this.totalRecords = result.totalElements;
          },
          error: error => this.toastErrorService.alertError(error)
        })
    }
  }

  goDetalhamento(event: any) {
    this.router.navigate([`acervo/view/${event.id}`]);
  }

}
