import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DeleteImageResponseDataType, ImagesDataType } from 'src/app/utils/types';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.scss']
})
export class ShowImagesComponent implements OnInit {
  images: Array<ImagesDataType> = []
  constructor(private _httpService: HttpService, private _notificationService: NotificationService) { }

  ngOnInit(): void {
    this._httpService.getAllImages().pipe(take(1)).subscribe((data: ImagesDataType[]) => {
      this.images = data
    })
  }
  deleteImage(imageId: number): void {
    const text = "Are you sure?";
    if (confirm(text)) {
      this._httpService.deleteImage(imageId).pipe(take(1)).subscribe((res: DeleteImageResponseDataType) => {
        this.images = this.images.filter(image => image.imageId !== res.imageId)
        this._notificationService.openSnackBar("Image Deleted Successfully!")
      })
    }
  }
}
