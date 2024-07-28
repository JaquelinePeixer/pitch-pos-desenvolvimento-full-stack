import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SharedModule, AccordionModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  contentBreadcrumb = [ ];
}
