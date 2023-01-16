import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  const mockSnackbarMock = jasmine.createSpyObj(['openFromComponent']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: mockSnackbarMock }]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be able to open the snackbar', () => {
    service.openSnackBar("Test Message")
    expect(mockSnackbarMock.openFromComponent).toHaveBeenCalledWith(SnackbarComponent, {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 3000,
      data: { message: "Test Message" }
    })
  });
});
