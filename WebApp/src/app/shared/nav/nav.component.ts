import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AlertModalService } from '../../service/alert-modal/alert-modal.service';
import { AuthUser } from '@app/authentication/auth-user.model';
import { PermissionEnum } from '@app/authentication/permission.enum';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [TranslateModule, RouterLink, MenuModule, ButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  usuario: string;

  @ViewChild('menu')
  menu: any

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertService: AlertModalService
  ) {
    this.usuario = this.authService.getUser()?.name;
  }

  getUsuario() {
    const invalid = this.authService.isAuthenticatedRefresh();
    if (!invalid) {
      const user = this.authService.getUser()
      return user?.name;
    }
    return null;
  }

  async logout() {
    try {
      await this.authService.logout();
      this.menu.nativeElement.classList.remove('show');
      this.router.navigate(['/']);
    } catch (error) {
      this.alertService.defaultError('Problema ao sair, favor tente novamente')
    }
  }

  intranet() {
    const loggedUser: AuthUser = this.authService.loggedUser();

    if (loggedUser?.role) {
      if (loggedUser.role === PermissionEnum.USER) {
        this.router.navigate(['/intranet/renovacao']);
      } else {
        this.router.navigate(['/intranet/emprestimo']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
