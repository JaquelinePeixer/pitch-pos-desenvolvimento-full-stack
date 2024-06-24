import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { FormComponent } from '../../components/form/form.component';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { AssuntoService } from '../../../../../service/assunto/assunto.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Assunto } from '../../../../../service/assunto/assunto';
import { AlertModalService } from '../../../../../service/alert-modal/alert-modal.service';

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
      action: AppMenuModel.menuIntranet.routerLink
    },
    {
      title: 'autor.page.title',
      action: AppMenuModel.menuAssunto.routerLink
    },
    {
      title: 'autor.page.new',
      action: null
    }
  ];

  menuBack = AppMenuModel.menuAssunto

  private id!: number;

  @ViewChild('form')
  form!: FormComponent;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private assuntoService: AssuntoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertModalService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.loadingService.startLoadind();
    this.assuntoService.getId(this.id)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: Assunto) => {
          this.form.patchValue(result)
        },
        error: error => this.alertService.defaultError(error.error)
      })
  }

  ngAfterViewInit(): void {
    console.log(this.form)
    this.form.onSubmit = (entity: Assunto) => this.submit(entity);
    this.form.onCancel = () => this.router.navigate([this.menuBack.routerLink]).then();
  }

  submit(entity: Assunto): void {
    this.loadingService.startLoadind();
    this.assuntoService.put(this.id, entity)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: any) => {
          this.alertService.defaultSuccess(result.message)
          this.router.navigate([this.menuBack.routerLink])
        },
        error: error => this.alertService.defaultError(error.error.message)
      })
  }
}
