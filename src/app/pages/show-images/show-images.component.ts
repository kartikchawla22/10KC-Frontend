import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ConfirmationDialogueComponent } from 'src/app/components/confirmation-dialogue/confirmation-dialogue.component';
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

  constructor(private _dialog: MatDialog, private _httpService: HttpService, private _notificationService: NotificationService) { }

  ngOnInit(): void {
    this._httpService.getAllImages().pipe(take(1)).subscribe((data: ImagesDataType[]) => {
      this.images = data
    })
  }

  openDialog(imageId: number): void {
    const dialogRef = this._dialog.open(ConfirmationDialogueComponent, {
      maxWidth: "400px",
      data: { imageId }
    });
    dialogRef.afterClosed().subscribe((dialogueClose) => {
      if (dialogueClose.selection) {
        this._httpService.deleteImage(dialogueClose.imageId).pipe(take(1)).subscribe((res: DeleteImageResponseDataType) => {
          this.images = this.images.filter(image => image.imageId !== res.imageId)
          this._notificationService.openSnackBar("Image Deleted Successfully!")
        })
      }
    });
  }
}
