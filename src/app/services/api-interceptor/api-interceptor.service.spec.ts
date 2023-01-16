import { HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { MaterialModule } from 'src/material.module';
import { HttpService } from '../http/http.service';
import { LoaderService } from '../loader/loader.service';
import { NotificationService } from '../notification/notification.service';

import { ApiInterceptorService } from './api-interceptor.service';

describe('ApiInterceptorService', () => {
  let service: HttpService;
  let interceptor: ApiInterceptorService;
  const loaderServiceSpy = jasmine.createSpyObj("LoaderService", ["showLoader", "hideLoader"])
  const notificationSerivceSpy = jasmine.createSpyObj("NotificationService", ["openSnackBar"])

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule],
      providers: [
        HttpService,
        ApiInterceptorService,
        { provide: LoaderService, useValue: loaderServiceSpy },
        { provide: NotificationService, useValue: notificationSerivceSpy }
      ]
    });
    service = TestBed.inject(HttpService);
    interceptor = TestBed.inject(ApiInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should intercept any request', () => {
    const next: any = {
      handle: () => {
        return new Observable(subscriber => {
          subscriber.complete();
        });
      }
    };

    const requestMock = new HttpRequest('GET', '/test');

    interceptor.intercept(requestMock, next).subscribe(() => {
      expect(loaderServiceSpy.showLoader).toHaveBeenCalled()
    });
  })

  it('should intercept any request and show error', () => {
    const next: any = {
      handle: () => {
        return new Observable(subscriber => {
          const error = new Error()
          Object.defineProperty(error, "error", { value: { error: "check" }, writable: false })
          throw error
        });
      }
    };

    const requestMock = new HttpRequest('GET', '/test');

    interceptor.intercept(requestMock, next).subscribe(() => {
      expect(loaderServiceSpy.hideLoader).toHaveBeenCalled()
      expect(notificationSerivceSpy.openSnackBar).toHaveBeenCalledWith("check")
    });
  })

  it('should intercept any request and show error - no error branch', () => {
    const next: any = {
      handle: () => {
        return new Observable(subscriber => {
          const error = new Error()
          Object.defineProperty(error, "error", { value: { error: "" }, writable: false })
          throw error
        });
      }
    };

    const requestMock = new HttpRequest('GET', '/test');

    interceptor.intercept(requestMock, next).subscribe(() => {
      expect(loaderServiceSpy.hideLoader).toHaveBeenCalled()
      expect(notificationSerivceSpy.openSnackBar).toHaveBeenCalledWith("Something went wrong!")
    });
  })

  it('should intercept any request and hide error on getting response', () => {
    const next: any = {
      handle: () => {
        return new Observable(subscriber => {
          subscriber.next(new HttpResponse({}))
          subscriber.complete()
        });
      }
    };

    const requestMock = new HttpRequest('GET', '/test');

    interceptor.intercept(requestMock, next).subscribe(() => {
      expect(loaderServiceSpy.hideLoader).toHaveBeenCalled()
    });
  })
});
