import { Component, Input } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Obra } from '@service/obra/obra';
import { Assunto } from '@service/assunto/assunto';
import { AssuntoService } from '@service/assunto/assunto.service';
import { finalize } from 'rxjs';
import { LoadingService } from '@shared/loading/loading.service';
import { TipoAutor } from '@domain/enum/tipoAutor.enum';
import { AutorService } from '@service/autor/autor.service';
import { Autor } from '@service/autor/autor';
import { onlySpaceValidator } from '@domain/validators/only-space-validaor';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() isNew?: boolean;

  menuBack = AppMenuModel.menuObra;
  formGroup: FormGroup;
  optionAssuntos: Assunto[];
  tableAutor: any[] = [];
  optionAutor: Autor[] = [];

  onSubmit!: (entity: Obra) => void;
  onCancel!: () => void;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private assuntoService: AssuntoService,
    private autorService: AutorService,
    private toastErrorService: ToastErrorService
  ) {
    this.formGroup = this.formBuilder.group({
      id: [null, [Validators.required]],
      title: [null, [Validators.required, Validators.maxLength(255), onlySpaceValidator]],
      publicationYear: [null, [Validators.required]],
      publisherName: [null, [Validators.required, Validators.maxLength(255), onlySpaceValidator]],
      bookcase: [null, [Validators.required]],
      volume: [null, [Validators.required]],
      pageQuantity: [null, [Validators.required]],
      publicationLocation: [null],
      quantityOfCopies: [null],
      author: [null, [Validators.required]],
      secondaryAuthor: [null],
      subject: [null, [Validators.required]],
      edition: [null, [Validators.required]],
    })
    this.getAssuntos();
  }

  submit() {
    this.onSubmit(this.formGroup.value)
  }

  cancel() {
    this.onCancel()
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  patchValue(entity: Obra): void {
    if (entity != null) {
      this.formGroup.patchValue(entity);
    }
  }

  getAssuntos() {
    this.loadingService.startLoadind();
    this.assuntoService.getList()
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: result => this.optionAssuntos = result,
        error: error => this.toastErrorService.alertError(error)
      })
  }

  removerAutor(id: any) {
    this.tableAutor = this.tableAutor.filter(x => x.id != id);
  }

  addAutorSecundario() {
    this.tableAutor.push({
      id: this.getIdAutor(),
      tipo: TipoAutor.autorSecundario,
      author: `Autor ${this.tableAutor.length}`
    })
  }

  addAutor() {
    this.tableAutor.push({
      id: this.getIdAutor(),
      tipo: TipoAutor.autor,
      author: `Autor ${this.tableAutor.length}`
    })
  }

  getIdAutor() {
    return this.tableAutor.length + 1;
  }

  selectEvent(autor: Autor, item: any) {
    item.author = autor;
  }

  searchAutor(query: any) {
    debugger
    if (query.length > 2) {
      this.loadingService.startLoadind();
      this.autorService.getList(query)
        .pipe(finalize(() => this.loadingService.stopLoadind()))
        .subscribe({
          next: result => this.optionAutor = result,
          error: error => this.toastErrorService.alertError(error)
        })
    }
  }

}
