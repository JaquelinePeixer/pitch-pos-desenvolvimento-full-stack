import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { AutorService } from '../../../../../service/autor/autor.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { FormComponent } from '../../components/form/form.component';
import { Autor } from '../../../../../service/autor/autor';



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
      title: 'autor.page.title',
      action: AppMenuModel.menuAutor.routerLink
    },
    {
      title: 'autor.page.new',
      action: null
    }
  ];

  menuBack = AppMenuModel.menuAutor

  @ViewChild('form') 
  form!: FormComponent

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private autorService: AutorService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.form.onSubmit = (entity: Autor) => this.onSubmit(entity);
    this.form.onCancel = () => this.router.navigate([this.menuBack.routerLink]).then();
  }

  onSubmit(entity: Autor): void {
    this.loadingService.startLoadind();
    this.autorService.post(entity)
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
