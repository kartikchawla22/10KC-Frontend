import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FileSizePipe } from 'src/app/pipes/file-size.pipe';
import { HttpService } from 'src/app/services/http/http.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MaterialModule } from 'src/material.module';

import { UploadImageComponent } from './upload-image.component';

describe('UploadImageComponent', () => {
  let component: UploadImageComponent;
  let fixture: ComponentFixture<UploadImageComponent>;
  const notificationSerivceSpy = jasmine.createSpyObj('NotificationService', ['openSnackBar']);
  const httpServiceSpy = jasmine.createSpyObj('NotificationService', {
    uploadImage: of(
      {
        data: {
          imageId: 1,
          imageName: "test.jpg"
        }
      })
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadImageComponent, FileSizePipe],
      imports: [MaterialModule],
      providers: [
        { provide: NotificationService, useValue: notificationSerivceSpy },
        { provide: HttpService, useValue: httpServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Call upload image API', () => {
    const file = new File([''], 'dummy.jpg');
    component.file = file
    component.onUpload()
    expect(httpServiceSpy.uploadImage).toHaveBeenCalledWith(file)
  });

  it('file should be null when delete', () => {
    const file = new File([''], 'dummy.jpg');
    component.file = file
    component.removeFile()
    expect(component.file).toBeNull()
  });

  it('file should be set onChange', async () => {
    const dataTransfer = new DataTransfer()
    const file = new File([''], 'dummy.jpg', {
      type: "image/jpeg"
    });
    dataTransfer.items.add(file)

    const inputDebugEl = fixture.debugElement.query(By.css('input[type=file]'));
    inputDebugEl.nativeElement.files = dataTransfer.files;

    inputDebugEl.triggerEventHandler('change', { target: inputDebugEl.nativeElement });

    fixture.detectChanges();

    expect(component.onChange).toBeTruthy()
    expect(component.file).toEqual(file)

  });

  it('file should show notification if file is not png, jpg or jpeg', async () => {
    const dataTransfer = new DataTransfer()
    const file = new File([''], 'dummy.pdf', {
      type: "pdf"
    });
    dataTransfer.items.add(file)

    const inputDebugEl = fixture.debugElement.query(By.css('input[type=file]'));
    inputDebugEl.nativeElement.files = dataTransfer.files;

    inputDebugEl.triggerEventHandler('change', { target: inputDebugEl.nativeElement });

    fixture.detectChanges();

    expect(component.onChange).toBeTruthy()
    expect(component.file).toBeNull()
    expect(notificationSerivceSpy.openSnackBar).toHaveBeenCalledWith("Only png, jpg and jpeg is allowed")

  });

  it('file should set the file when dropped', async () => {
    const file = new File([''], 'dummy.jpg', {
      type: "image/jpeg"
    });
    component.fileDropped(file)
    expect(component.file).toEqual(file)

  });
  it('file should not be set if type doesn\'t match', async () => {
    const file = new File([''], 'dummy.pdf', {
      type: "pdf"
    });
    component.fileDropped(file)
    expect(component.file).toBeNull()
    expect(notificationSerivceSpy.openSnackBar).toHaveBeenCalledWith("Only png, jpg and jpeg is allowed")
  });
});
