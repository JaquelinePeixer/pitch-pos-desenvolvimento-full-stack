import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  contentBreadcrumb = [
    {
      title: 'menu.intranet',
      action: null
    }
  ];
}
