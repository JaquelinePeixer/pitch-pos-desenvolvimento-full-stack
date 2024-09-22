import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication/authentication.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { Login } from '../../authentication/login.model';
import { plainToClass } from 'class-transformer';
import { AlertModalService } from '../../service/alert-modal/alert-modal.service';
import { PasswordModule } from 'primeng/password';

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
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertModalService,
    private router: Router
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
          this.router.navigate(['/intranet'])
        },
        error: error => {
          this.alertService.defaultError(error.message)
        }
      })
    }
  }

}
