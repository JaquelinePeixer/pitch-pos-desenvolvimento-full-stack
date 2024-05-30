import { Component } from '@angular/core';
import { AppMenuModel } from '../../../../../domain/menu/app-menu.model';

@Component({
  selector: 'app-new',
  standalone: false,
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: AppMenuModel.menuIntranet.routerLink
    },
    {
      title: 'usuario.page.title',
      actiion: null
    }
  ];
}
