import { Component } from '@angular/core';
import { LoadingService } from '@shared/loading/loading.service';
import { finalize } from 'rxjs';
import { UsuarioService } from '@app/service/usuario/usuario.service';
import { UsuarioObrasEmprestadas } from '@app/service/usuario/usuario-obras-emprestadas';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';
import { PaginatorComponent } from '@app/shared/paginator/paginator.component';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends PaginatorComponent{
  tableData: UsuarioObrasEmprestadas[] = [];
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
    private usuarioService: UsuarioService,
    private toastErrorService: ToastErrorService
  ) {
    super();
  }

  fetch(event?: number) {
    this.loadingService.startLoadind();
    this.usuarioService.getPorUsuario(event)
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
