import { Component } from '@angular/core';
import { take } from 'rxjs';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.scss']
})
export class ShowImagesComponent {
  images: Array<any> = []
  constructor(private _httpService: HttpService, private _notificationService: NotificationService) { }
  ngOnInit(): void {
    this._httpService.getAllImages().pipe(take(1)).subscribe((data) => {
      console.log(data);

      this.images = data
    })
  }
  deleteImage(imageId: number) {
    const text = "Are you sure?";
    if (confirm(text) == true) {
      this._httpService.deleteImage(imageId).pipe(take(1)).subscribe((res: any) => {
        console.log(res);
        this.images = this.images.filter(image => image.imageId != res.imageId)
        this._notificationService.openSnackBar("Image Deleted Successfully!")
      })
    }
  }
}
