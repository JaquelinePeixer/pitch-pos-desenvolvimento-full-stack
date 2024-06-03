import { Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { AssuntoService } from '../../../../../service/assunto/assunto.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Assunto } from '../../../../../service/assunto/assunto';
import { EditComponent } from '../edit/edit.component';

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

  @ViewChild('editForm')
  editForm!: EditComponent

  constructor(
    private loadingService: LoadingService,
    private assuntoService: AssuntoService,
    private router: Router
  ) {
    this.fetch();
  }

  fetch() {
    this.loadingService.startLoadind();
    this.assuntoService.get()
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
    debugger


  }

  remover(item?: any) {
    this.loadingService.startLoadind();
    this.assuntoService.delete(item.id)
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
