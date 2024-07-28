import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acervo',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './acervo.component.html',
  styleUrl: './acervo.component.scss'
})
export class AcervoComponent {

}
