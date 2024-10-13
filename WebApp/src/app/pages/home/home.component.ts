import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AccordionModule } from 'primeng/accordion';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { AuthUser } from '@app/authentication/auth-user.model';
import { PermissionEnum } from '@app/authentication/permission.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SharedModule, AccordionModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  contentBreadcrumb = [];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  intranet() {
    const loggedUser: AuthUser = this.authenticationService.loggedUser();

    if(loggedUser?.role){
      if (loggedUser.role === PermissionEnum.USER) {
        this.router.navigate(['/intranet/obra-emprestada']);
      } else {
        this.router.navigate(['/intranet/emprestimo']);
      }
    } else {
      this.router.navigate(['/login']);
    }    
  }
}
