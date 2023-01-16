import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;
  const loaderSpy = jasmine.createSpyObj('service.isLoader$', ['next'])

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should set loader to true', (done: DoneFn) => {
    service.showLoader()
    service.isLoader$.subscribe((res) => {
      expect(res).toEqual(true)
      done()
    })
  });
  it('should set loader to false', (done: DoneFn) => {
    service.hideLoader()
    service.isLoader$.subscribe((res) => {
      expect(res).toEqual(false)
      done()
    })
  });
});
