import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { plainToClass } from 'class-transformer';
import { PasswordModule } from 'primeng/password';
import { PermissionEnum } from '@app/authentication/permission.enum';
import { SharedModule } from '@app/shared/shared.module';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Login } from '@app/authentication/login.model';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    CheckboxModule,
    PasswordModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formGroup: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastErrorService: ToastErrorService
  ) {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(4)]]
    })
  }

  login() {
    if (this.formGroup.valid) {
      const request: Login = plainToClass(Login, this.formGroup.value);

      this.authService.loginUser(request).subscribe({
        next: response => {
          this.authService.setLocalStorage(response);
          if (response.role === PermissionEnum.USER) {
            this.router.navigate(['/intranet/renovacao']);
          } else {
            this.router.navigate(['/intranet/emprestimo']);
          }
        },
        error: error => this.toastErrorService.alertError(error)
      })
    }
  }

}
