import { Component } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { AutorService } from '../../../../../service/autor/autor.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-new',
  standalone: false,
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
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

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private autorService: AutorService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(150)]],
      birthYear: [null, [Validators.required]],
      deathhYear: [null]
    })
  }

  submit() {
    this.loadingService.startLoadind();
    this.autorService.post(this.formGroup.value)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: result => {
          this.clear()
          this.router.navigate([this.menuBack.routerLink])

        },
        error: error => {
          debugger
        }
      })

  }

  cancelar() {
    this.clear()
    this.router.navigate([this.menuBack.routerLink])
  }

  clear() {
    this.formGroup.reset();
  }


}
