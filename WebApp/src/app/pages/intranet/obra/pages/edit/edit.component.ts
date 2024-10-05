import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { FormComponent } from '@intranet/obra/components/form/form.component';
import { LoadingService } from '@shared/loading/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ObraService } from '@service/obra/obra.service';
import { Obra } from '@service/obra/obra';
import { AlertModalService } from '@service/alert-modal/alert-modal.service';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit, AfterViewInit {
  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: null
    },
    {
      title: 'obra.page.title',
      action: AppMenuModel.menuObra.routerLink
    },
    {
      title: 'obra.page.new',
      action: null
    }
  ];

  menuBack = AppMenuModel.menuObra

  private id!: number;

  @ViewChild('form')
  form!: FormComponent;

  constructor(
    private loadingService: LoadingService,
    private obraService: ObraService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastErrorService: ToastErrorService,
    private alertService: AlertModalService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.loadingService.startLoadind();
    this.obraService.getId(this.id)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: Obra) => this.form.patchValue(result),
        error: error => this.toastErrorService.alertError(error)
      })
  }

  ngAfterViewInit(): void {
    console.log(this.form)
    this.form.onSubmit = (entity: Obra) => this.submit(entity);
    this.form.onCancel = () => this.router.navigate([this.menuBack.routerLink]).then();
  }

  submit(entity: Obra): void {
    this.loadingService.startLoadind();
    this.obraService.put(this.id, entity)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: any) => {
          this.alertService.defaultSuccess(result.message)
          this.router.navigate([this.menuBack.routerLink])
        },
        error: error => this.toastErrorService.alertError(error)
      })
  }
}
