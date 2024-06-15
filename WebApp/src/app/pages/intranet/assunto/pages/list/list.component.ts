import { Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { AssuntoService } from '../../../../../service/assunto/assunto.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Assunto } from '../../../../../service/assunto/assunto';
import { EditComponent } from '../edit/edit.component';
import { AlertModalService } from '../../../../../service/alert-modal/alert-modal.service';

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
    private router: Router,
    private alertService: AlertModalService
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
        error: error => this.alertService.defaultError(error.message)
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
        next: (result: any) => {
          this.alertService.defaultSuccess(result)
          this.fetch();          
        },
        error: error => this.alertService.defaultError(error.message)
      })
  }
}
