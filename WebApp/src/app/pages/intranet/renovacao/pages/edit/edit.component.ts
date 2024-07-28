import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { FormComponent } from '../../components/form/form.component';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from '../../../../../service/alert-modal/alert-modal.service';
import { Renovacao } from '../../../../../service/renovacao/renovacao';
import { RenovacaoService } from '../../../../../service/renovacao/renovacao.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements AfterViewInit {
  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: AppMenuModel.menuIntranet.routerLink
    },
    {
      title: 'renovacao.page.title',
      action: null
    }
  ];

  menuBack = AppMenuModel.menuRenovacao

  @ViewChild('form')
  form!: FormComponent;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private renovacaoService: RenovacaoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertModalService
  ) {
  }

  ngAfterViewInit(): void {
    this.form.onSubmit = (entity: Renovacao) => this.submit(entity);
  }

  submit(entity: Renovacao): void {
    this.loadingService.startLoadind();
    this.renovacaoService.post(entity)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: () => {
          // this.alertService.defaultSuccess(result)
          // this.router.navigate([this.menuBack.routerLink])
        },
        error: error => this.alertService.defaultError(error.message)
      })
  }
}
