import { TableLazyLoadEvent } from 'primeng/table';
import { PageSize } from '@domain/pagination/pagesize.enum';

export abstract class PaginatorComponent {
  search: any;
  pageSize = PageSize.sizeDefault;
  totalRecords = 0;

  filter(params: any) {
    this.search = this.removeNulls(params);
    this.fetch();
  }

  removeNulls(obj: any): any {
    if (obj === null || obj === undefined || obj === '') {
      return undefined;
    }

    if (typeof obj === 'object' && !Array.isArray(obj)) {
      return Object.entries(obj)
        .filter(([_, value]) => value !== null && value !== undefined)
        .reduce((acc, [key, value]) => {
          const cleanedValue = this.removeNulls(value);
          if (cleanedValue !== undefined) {
            acc[key] = cleanedValue;
          }
          return acc;
        }, {} as any);
    }

    if (Array.isArray(obj)) {
      return obj.map(this.removeNulls).filter((item) => item !== undefined);
    }

    return obj;
  }

  paginate(event: TableLazyLoadEvent) {
    const first = event.first || 0;
    const page: number = first / this.pageSize;
    this.fetch(page)
  }

  abstract fetch(page?: number): void;

}
