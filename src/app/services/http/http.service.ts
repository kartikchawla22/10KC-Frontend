import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ImageData, ImageList, DeleteImageResponseType, DeleteImageResponse, UploadImageResponse } from 'src/app/utils/types';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private _baseURL = "http://localhost:8000/api/v1"

  constructor(private _http: HttpClient) { }

  getAllImages(): Observable<Array<ImageData>> {
    return this._http.get<ImageList>(`${this._baseURL}/getAllImages`).pipe(
      map((images: ImageList) => images.data))
  }

  uploadImage(file: File): Observable<UploadImageResponse> {
    const formData = new FormData();
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    formData.append("imageName", file.name);
    return this._http.post<UploadImageResponse>(`${this._baseURL}/uploadImage`, formData)
  }

  deleteImage(imageId: number): Observable<DeleteImageResponse> {
    return this._http.delete<DeleteImageResponseType>(`${this._baseURL}/deleteImageUsingID?imageId=${imageId}`).pipe(
      map((response: DeleteImageResponseType) => response.data))
  }
}
