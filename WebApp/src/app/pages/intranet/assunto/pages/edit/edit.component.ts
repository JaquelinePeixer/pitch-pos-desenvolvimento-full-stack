import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { FormComponent } from '../../components/form/form.component';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { AssuntoService } from '../../../../../service/assunto/assunto.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Assunto } from '../../../../../service/assunto/assunto';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit, AfterViewInit {

  menuBack = AppMenuModel.menuAssunto

  private id!: number;

  @ViewChild('form')
  form!: FormComponent;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private assuntoService: AssuntoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    // this.fetch();
  }

  fetch() {
    this.loadingService.startLoadind();
    this.assuntoService.getId(this.id)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: Assunto) => {
          this.form.patchValue(result)
        },
        error: error => {
          alert('fetch erro: ' + error.message);
        }
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
