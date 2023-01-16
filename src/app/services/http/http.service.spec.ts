import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpTestingController: HttpTestingController;
  const baseURL = "http://localhost:8000/api/v1"
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call delete image API', () => {
    service.deleteImage(100).subscribe();
    const req = httpTestingController.expectOne(`${baseURL}/deleteImageUsingID?imageId=100`);
    httpTestingController.verify();
    req.flush({});
  });

  it('should call getAllImages API', () => {
    service.getAllImages().subscribe();
    const req = httpTestingController.expectOne(`${baseURL}/getAllImages`);
    httpTestingController.verify();
    req.flush({});
  });

  it('should call uploadImage API', () => {
    const file = new File([''], 'dummy.jpg');
    service.uploadImage(file).subscribe();
    const req = httpTestingController.expectOne(`${baseURL}/uploadImage`);
    httpTestingController.verify();
    req.flush({});
  });
});