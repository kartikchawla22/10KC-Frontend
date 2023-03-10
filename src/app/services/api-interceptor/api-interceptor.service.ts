import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {

  constructor(private _loaderService: LoaderService, private _notificationService: NotificationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loaderService.showLoader();

    return next.handle(request)
      .pipe(
        catchError(({ error }) => {
          this._notificationService.openSnackBar(error?.error ?? "Something went wrong!");
          this._loaderService.hideLoader();
          return of(error);
        }),
        map(evt => {
          if (evt instanceof HttpResponse) {
            this._loaderService.hideLoader();
          }
          return evt;
        })
      );
  }
}
