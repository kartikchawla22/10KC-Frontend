import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ImagesDataType, ImagesType, DeleteImageResponseType, DeleteImageResponseDataType, UploadImageResponseType } from 'src/app/utils/types';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private readonly _baseURL = "http://localhost:8000/api/v1"

  constructor(private _http: HttpClient) { }

  getAllImages(): Observable<Array<ImagesDataType>> {
    return this._http.get<ImagesType>(`${this._baseURL}/getAllImages`).pipe(
      map((images: ImagesType) => images.data))
  }

  uploadImage(file: File): Observable<UploadImageResponseType> {
    const formData = new FormData();
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    formData.append("imageName", file.name);
    return this._http.post<UploadImageResponseType>(`${this._baseURL}/uploadImage`, formData)
  }

  deleteImage(imageId: number): Observable<DeleteImageResponseDataType> {
    return this._http.delete<DeleteImageResponseType>(`${this._baseURL}/deleteImageUsingID?imageId=${imageId}`).pipe(
      map((response: DeleteImageResponseType) => response.data))
  }
} 