import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-localizacao',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './localizacao.component.html',
  styleUrl: './localizacao.component.scss'
})
export class LocalizacaoComponent {
  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: '/'
    },
    {
      title: 'menu.localizacao',
      action: null
    }
  ];

}
