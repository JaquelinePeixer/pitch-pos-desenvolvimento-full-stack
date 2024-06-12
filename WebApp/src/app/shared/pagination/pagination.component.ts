import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pagination } from '../../domain/pagination/pagination';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Output() pageChangeEvent = new EventEmitter();
  contentPagination: any[] = [];

  createdPages(pagination: Pagination): void {
    let page = 0;
    for (let index = 0; index < pagination.totalElements; index++) {
      this.contentPagination.push({
        page: page,
        active: false,
        label: `${index + 1}-${index + 5}`
      })
      index = index + 4;
      page = page + 1;
    }
    this.contentPagination[0].active = true;
  }

  pageChange(page: any) {
    this.pageChangeEvent.emit(page);
    this.contentPagination.map(x => x.active = false);
    this.contentPagination[page].active = true;
  }

}
