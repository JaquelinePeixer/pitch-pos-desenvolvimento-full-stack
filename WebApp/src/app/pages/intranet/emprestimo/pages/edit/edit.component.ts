import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { FormComponent } from '../../components/form/form.component';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { AutorService } from '../../../../../service/autor/autor.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from '../../../../../service/autor/autor';
import { finalize } from 'rxjs';
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
      action: null
    },
    {
      title: 'emprestimo.page.title',
      action: AppMenuModel.menuEmprestimo.routerLink
    },
    {
      title: 'emprestimo.page.new',
      action: null
    }
  ];

  menuBack = AppMenuModel.menuAutor

  private id!: number;

  @ViewChild('form')
  form!: FormComponent;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private autorService: AutorService,
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
    this.autorService.getId(this.id)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: Autor) => {
          this.form.patchValue(result)
        },
        error: error => this.alertService.defaultError(error.message)
      })
  }

  ngAfterViewInit(): void {
    console.log(this.form)
    this.form.onSubmit = (entity: Autor) => this.submit(entity);
    this.form.onCancel = () => this.router.navigate([this.menuBack.routerLink]).then();
  }

  submit(entity: Autor): void {
    this.loadingService.startLoadind();
    this.autorService.put(this.id, entity)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result:any) => {
          this.alertService.defaultSuccess(result)
          this.router.navigate([this.menuBack.routerLink])
        },
        error: error => this.alertService.defaultError(error.message)
      })
  }
}
