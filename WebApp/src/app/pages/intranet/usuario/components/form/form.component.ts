import { Component, Input, OnInit } from '@angular/core';
import { AppMenuModel } from '@domain/menu/app-menu.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '@service/usuario/usuario';
import { onlySpaceValidator } from '@domain/validators/only-space-validaor';
import { TranslateService } from '@ngx-translate/core';
import { SituacaoUsuarioEnum } from '@app/domain/enum/situacaoUsuario.enum';
import { AccessLevelEnum } from '@app/domain/enum/accessLevel.enum';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  @Input() isNew?: boolean;

  menuBack = AppMenuModel.menuUsuario;
  formUsuario: FormGroup;

  onSubmit!: (entity: Usuario) => void;
  onCancel!: () => void;

  optionAccessLevel = [
    { value: AccessLevelEnum.USER, label: this.translateService.instant('label.user') },
    { value: AccessLevelEnum.LIBRARIAN, label: this.translateService.instant('label.librarian') },
    { value: AccessLevelEnum.ADMIN, label: this.translateService.instant('label.admin'), disabled: true }
  ];

  optionSituationUser = [
    { value: SituacaoUsuarioEnum.ACTIVE, label: this.translateService.instant('label.ativo') },
    { value: SituacaoUsuarioEnum.INACTIVE, label: this.translateService.instant('label.inativo') }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService
  ) {
    this.formUsuario = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(150), onlySpaceValidator]],
      birthDate: [null, [Validators.required]],
      email: [null, [Validators.email, onlySpaceValidator]],
      role: [AccessLevelEnum.USER],
      cpf: [null],
      password: [null],
      userSituation: [SituacaoUsuarioEnum.ACTIVE]
    })
  }

  ngOnInit(): void {
    if (!this.isNew) this.formUsuario.controls['password'].disable()
  }

  submit() {
    this.onSubmit(this.formUsuario.value);
  }

  cancel() {
    this.onCancel()
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formUsuario.controls;
  }

  patchValue(entity: Usuario): void {
    if (entity != null) {
      this.formUsuario.patchValue(entity);
      if (entity.birthDate) this.formUsuario.controls['birthDate'].setValue(new Date(entity.birthDate));
    }
  }

}
