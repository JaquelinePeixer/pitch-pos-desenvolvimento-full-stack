import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  @Input() content: any[] | undefined

  contentInitial = [
    {
      title: 'menu.library',
      action: null
    }
  ]

  ngOnInit(): void {
    this.content?.forEach(item => {
      this.contentInitial.push(item)
    })
  }
}
