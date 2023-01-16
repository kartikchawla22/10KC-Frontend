import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/material.module';

import { SnackbarComponent } from './snackbar.component';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;
  const mockSnackbarMock = jasmine.createSpyObj(['dismiss']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackbarComponent],
      imports: [MaterialModule],
      providers: [{ provide: MAT_SNACK_BAR_DATA, useValue: { message: "Test Message" } },
      { provide: MatSnackBar, useValue: mockSnackbarMock }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the test message', () => {
    expect(fixture.debugElement.nativeElement.querySelector(".snack-container > div > span").innerHTML).toBe("Test Message")
  })
  it('should close the test message', () => {
    component.closeSnackBar()
    expect(mockSnackbarMock.dismiss).toHaveBeenCalled()
  })
});
