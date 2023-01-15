import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadImageComponent {
  file: File | null = null
  @ViewChild("fileInput") fileInput!: HTMLInputElement

  private readonly acceptedFileTypes: Array<string> = ["image/jpg", "image/jpeg", "image/png"]

  constructor(private _httpService: HttpService, private _cd: ChangeDetectorRef, private _notificationService: NotificationService) { }

  onChange(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement

    if (target.files && this.acceptedFileTypes.indexOf(target.files[0].type) > -1) {
      this.file = target.files[0];
    } else if (target.files && this.acceptedFileTypes.indexOf(target.files[0].type) === -1) {
      this._notificationService.openSnackBar("Only png, jpg and jpeg is allowed")
    }
    this.fileInput.value = this.file!.name
    this._cd.detectChanges()

  }
  onUpload(): void {
    this._httpService.uploadImage(this.file as File).pipe(take(1)).subscribe(() => {
      this.file = null
      this._notificationService.openSnackBar("Image Uploaded Successfully!")
      this._cd.detectChanges()
    });
  }
  removeFile(): void {
    this.file = null
    this.fileInput.value = ""
    this._cd.detectChanges()
  }
  fileDropped(file: File): void {
    if (file && this.acceptedFileTypes.indexOf(file.type) > -1) {
      this.file = file
    } else {
      this._notificationService.openSnackBar("Only png, jpg and jpeg is allowed")
      return
    }
    this.fileInput.value = this.file.name
    this._cd.detectChanges()
  }
}
