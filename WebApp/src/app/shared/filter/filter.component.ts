import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class AppFilterComponent {
  @Output() onSearch = new EventEmitter();

}
