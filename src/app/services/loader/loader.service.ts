import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _isLoader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoader$(): BehaviorSubject<boolean> {
    return this._isLoader$;
  }

  showLoader(): void {
    this._isLoader$.next(true);
  }

  hideLoader(): void {
    this._isLoader$.next(false);
  }
}
