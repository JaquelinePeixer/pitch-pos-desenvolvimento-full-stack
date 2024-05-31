import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    loading = new Subject<boolean>();

    startLoadind(): void {
        this.loading.next(true)
    }

    stopLoadind(): void {
        this.loading.next(false)
    }
}
