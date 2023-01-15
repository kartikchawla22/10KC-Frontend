import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  showLoader() {
    this.isLoader$.next(true)
  }
  hideLoader() {
    this.isLoader$.next(false)
  }
}
