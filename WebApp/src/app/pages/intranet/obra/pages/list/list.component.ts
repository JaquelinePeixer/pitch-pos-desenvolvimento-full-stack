import { Component } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Obra } from '../../../../../service/obra/obra';
import { ObraService } from '../../../../../service/obra/obra.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  tableData: Obra[] = [];
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
    private router: Router
  ) {
    this.fetch();
  }

  fetch() {
    this.loadingService.startLoadind();
    this.obraService.get()
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: result => {
          this.tableData = result;
        },
        error: error => {
          alert('fetch erro: ' + error.message);
        }
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
        next: () => {
          this.fetch();
          alert('Removido com sucesso!');
        },
        error: error => {
          alert('remover erro: ' + error.message);
        }
      })
  }
}
