import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { FormComponent } from '../../components/form/form.component';
import { LocalizacaoService } from '../../../../../service/localizacao/localizacao.service';
import { Localizacao } from '../../../../../service/localizacao/localizacao';



@Component({
  selector: 'app-new',
  standalone: false,
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent implements AfterViewInit {
  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: AppMenuModel.menuIntranet.routerLink
    },
    {
      title: 'localizacao.page.title',
      action: AppMenuModel.menuLocalizacao.routerLink
    },
    {
      title: 'localizacao.page.new',
      action: null
    }
  ];

  menuBack = AppMenuModel.menuLocalizacao

  @ViewChild('form') 
  form!: FormComponent

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private localizacaoService: LocalizacaoService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.form.onSubmit = (entity: Localizacao) => this.onSubmit(entity);
    this.form.onCancel = () => this.router.navigate([this.menuBack.routerLink]).then();
  }

  onSubmit(entity: Localizacao): void {
    this.loadingService.startLoadind();
    this.localizacaoService.post(entity)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: () => {
          this.router.navigate([this.menuBack.routerLink])
          alert('success')
        },
        error: error => {
          alert(error.message)
        }
      })
  }

}
