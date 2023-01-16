import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MaterialModule } from 'src/material.module';

import { ShowImagesComponent } from './show-images.component';

describe('ShowImagesComponent', () => {
  let component: ShowImagesComponent;
  let fixture: ComponentFixture<ShowImagesComponent>;
  const notificationSerivceSpy = jasmine.createSpyObj('NotificationService', ['openSnackBar']);
  const httpServiceSpy = jasmine.createSpyObj('NotificationService', {
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getAllImages ApI on init', () => {
    component.ngOnInit()
    expect(httpServiceSpy.getAllImages).toHaveBeenCalled()
  });
  // fit('should call deleteImage ApI', () => {
  //   component.ngOnInit()
  //   fixture.detectChanges()
  //   const deleteButton = fixture.debugElement.nativeElement.querySelector(".delete-block") as HTMLButtonElement
  //   expect(deleteButton).toBeTruthy()
  //   deleteButton.click()
  //   const confirmSpy = spyOn(window, 'confirm').withArgs("Are you sure?").and.callFake(function () {
  //     return true;
  //   });
  //   expect(confirmSpy).toHaveBeenCalledWith("Are you sure?");
  //   expect(httpServiceSpy.deleteImage).toHaveBeenCalledWith(12)
  // });

  // fit('should not call deleteImage ApI', () => {
  //   component.ngOnInit()
  //   fixture.detectChanges()
  //   const deleteButton = fixture.debugElement.nativeElement.querySelector(".delete-block") as HTMLButtonElement
  //   expect(deleteButton).toBeTruthy()
  //   deleteButton.click()
  //   const confirmSpy = spyOn(window, 'confirm').and.callFake(function () {
  //     return false;
  //   });
  //   expect(confirmSpy).toHaveBeenCalledWith("Are you sure?");
  //   expect(httpServiceSpy.deleteImage).not.toHaveBeenCalled()
  // });
});
