import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { FormComponent } from '../../components/form/form.component';
import { AssuntoService } from '../../../../../service/assunto/assunto.service';
import { Assunto } from '../../../../../service/assunto/assunto';


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
      title: 'assunto.page.title',
      action: AppMenuModel.menuAssunto.routerLink
    },
    {
      title: 'assunto.page.new',
      action: null
    }
  ];

  menuBack = AppMenuModel.menuAssunto

  @ViewChild('form') 
  form!: FormComponent

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private assuntoService: AssuntoService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.form.onSubmit = (entity: Assunto) => this.onSubmit(entity);
    this.form.onCancel = () => this.router.navigate([this.menuBack.routerLink]).then();
  }

  onSubmit(entity: Assunto): void {
    this.loadingService.startLoadind();
    this.assuntoService.post(entity)
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
