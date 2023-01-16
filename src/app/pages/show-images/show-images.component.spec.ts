import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MaterialModule } from 'src/material.module';

import { ShowImagesComponent } from './show-images.component';

describe('ShowImagesComponent', () => {
  let component: ShowImagesComponent;
  let fixture: ComponentFixture<ShowImagesComponent>;
  const notificationSerivceSpy = jasmine.createSpyObj('NotificationService', ['openSnackBar']);
  let dialogAfterCloseData = { selection: true, imageId: 12 }
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(dialogAfterCloseData), close: null });
  let dialogSpy: jasmine.Spy
  const httpServiceSpy = jasmine.createSpyObj('HttpService', {
    getAllImages: of(
      [{
        contentType: "image/jpg",
        imageBuffer: "123",
        imageId: 12,
        imageName: "test.jpg",
        uploadTime: "133"
      }]),
    deleteImage: of({
      deletedImage: {
        acknowledged: true,
        deletedCount: 1
      },
      imageId: 12
    })
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowImagesComponent],
      imports: [MaterialModule],
      providers: [
        { provide: NotificationService, useValue: notificationSerivceSpy },
        { provide: HttpService, useValue: httpServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShowImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getAllImages ApI on init', () => {
    component.ngOnInit()
    expect(httpServiceSpy.getAllImages).toHaveBeenCalled()
  });

  it('should call deleteImage ApI', () => {
    component.ngOnInit()
    dialogAfterCloseData.selection = true
    dialogAfterCloseData.imageId = 12
    fixture.detectChanges()
    const deleteButton = fixture.debugElement.nativeElement.querySelector(".delete-block") as HTMLButtonElement
    expect(deleteButton).toBeTruthy()

    deleteButton.click()
    expect(dialogSpy).toHaveBeenCalled();
    expect(httpServiceSpy.deleteImage).toHaveBeenCalledWith(12)
    expect(notificationSerivceSpy.openSnackBar).toHaveBeenCalledWith("Image Deleted Successfully!")
  });
});
