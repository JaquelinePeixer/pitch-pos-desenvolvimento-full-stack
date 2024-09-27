import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { AppMenuModel } from '@app/domain/menu/app-menu.model';

@Component({
  selector: 'app-intranet',
  standalone: false,
  templateUrl: './intranet.component.html',
  styleUrl: './intranet.component.scss'
})
export class IntranetComponent implements OnInit {
  model: any[] = [];
  menuIntranet: any[] = [];

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    AppMenuModel.menuIntranet.items?.forEach(menu => {
      if (menu.role && this.authenticationService.checkRole(menu.role)) {
        this.menuIntranet.push(menu);
      }
    });
  }

}
