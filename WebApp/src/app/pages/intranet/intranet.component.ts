import { Component, OnInit } from '@angular/core';
import { AppMenuModel } from '../../domain/menu/app-menu.model';
import { AuthenticationService } from '../../authentication/authentication.service';
import { PermissionEnum } from '../../authentication/permission.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intranet',
  standalone: false,
  templateUrl: './intranet.component.html',
  styleUrl: './intranet.component.scss'
})
export class IntranetComponent implements OnInit {
  model: any[] = [];
  menuIntranet: any[] = [];

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    AppMenuModel.menuIntranet.items?.forEach(menu => {
      if (menu.role && this.authenticationService.checkRole(menu.role)) {
        this.menuIntranet.push(menu);
      }
    });

    if (this.authenticationService.loggedUser()?.role === PermissionEnum.USER) {
      this.router.navigate(['/intranet/obra-emprestada']);
    } else {
      this.router.navigate(['/intranet/emprestimo']);
    }

  }
}
