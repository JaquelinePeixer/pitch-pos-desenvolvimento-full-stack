import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule, RouterLink, BreadcrumbComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  contentBreadcrumb = [
    {
      title: 'Biblioteca Online',
      action: null
    }
  ];
}
