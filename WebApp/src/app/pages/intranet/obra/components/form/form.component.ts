import { Component, Input } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Obra } from '../../../../../service/obra/obra';
import { Assunto } from '../../../../../service/assunto/assunto';
import { AssuntoService } from '../../../../../service/assunto/assunto.service';
import { finalize } from 'rxjs';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { AlertModalService } from '../../../../../service/alert-modal/alert-modal.service';
import { TipoAutor } from '../../../../../domain/enum/tipoAutor.enum';

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
  testeAutor: any[] = [];

  onSubmit!: (entity: Obra) => void;
  onCancel!: () => void;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private assuntoService: AssuntoService,
    private alertService: AlertModalService
  ) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      title: [null],
      bookcase: [null],
      deathhYear: [null],
      subject: [null],
      edition: [null],
      publisherName: [null],
      volume: [null],
      pageQuantity: [null],
      publicationYear: [null],
      publicationLocation: [null],
      quantityOfCopies: [null],
      location: [null]
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
        error: error => this.alertService.defaultError(error.message)
      })
  }

  getSearchAutor() {
    this.loadingService.startLoadind();
    this.assuntoService.getList()
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: result => this.optionAssuntos = result,
        error: error => this.alertService.defaultError(error.message)
      })
  }

  removerAutor(id: any) {
    this.testeAutor = this.testeAutor.filter(x => x.id != id);
  }

  addAutorSecundario() {
    this.testeAutor.push({
      id: this.getIdAutor(),
      tipo: TipoAutor.autorSecundario,
      author: `Autor ${this.testeAutor.length}`
    })
  }

  addAutor() {
    this.testeAutor.push({
      id: this.getIdAutor(),
      tipo: TipoAutor.autor,
      author: `Autor ${this.testeAutor.length}`
    })
  }

  getIdAutor() {
    return this.testeAutor.length + 1;
  }

}
