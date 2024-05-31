import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-acervo',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './acervo.component.html',
  styleUrl: './acervo.component.scss'
})
export class AcervoComponent {

}
