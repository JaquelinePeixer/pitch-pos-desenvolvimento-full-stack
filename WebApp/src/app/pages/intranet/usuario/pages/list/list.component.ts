import { Component } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { LoadingService } from '@shared/loading/loading.service';
import { UsuarioService } from '@service/usuario/usuario.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Usuario } from '@service/usuario/usuario';
import { AlertModalService } from '@service/alert-modal/alert-modal.service';
import { PaginatorComponent } from '@shared/paginator/paginator.component';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends PaginatorComponent {
  tableData: Usuario[] = [];
  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: null
    },
    {
      title: 'usuario.page.title',
      action: null
    }
  ];

  constructor(
    private loadingService: LoadingService,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastErrorService: ToastErrorService,
    private alertService: AlertModalService
  ) {
    super();
  }

  fetch(page?: number) {
    this.loadingService.startLoadind();
    this.usuarioService.get(page, this.search)
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
    this.router.navigate([`${AppMenuModel.menuUsuario.routerLink}/edit/${item.id}`])
  }

  remover(item?: any) {
    this.loadingService.startLoadind();
    this.usuarioService.delete(item.id)
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
