import { Component } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutorService } from '../../../../../service/autor/autor.service';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { finalize } from 'rxjs';
import { Autor } from '../../../../../service/autor/autor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  formGroupFilter: FormGroup;
  tableData: Autor[] = []

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

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private autorService: AutorService,
    private router: Router
  ) {
    this.formGroupFilter = this.formBuilder.group({
      name: [null]
    })
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
        error: error => {
          alert('fetch erro: ' + error.message);
        }
      })
  }

  filter() {
    debugger
  }

  edit(item?: any) {
    this.router.navigate([`${AppMenuModel.menuAutor.routerLink}/edit/${item.id}`])
  }

  remover(item?: any) {
    this.loadingService.startLoadind();
    this.autorService.delete(item.id)
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
