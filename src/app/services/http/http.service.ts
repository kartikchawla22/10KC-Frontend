import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private readonly _baseURL = "http://localhost:8000/api/v1"

  constructor(private _http: HttpClient) { }

  getAllImages(): Observable<any> {
    return this._http.get(`${this._baseURL}/getAllImages`).pipe(
      map(({ data }: any) => data))
  }

  uploadImage(file: any): Observable<any> {
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    formData.append("imageName", file.name);
    return this._http.post(`${this._baseURL}/uploadImage`, formData)
  }

  deleteImage(imageId: number): Observable<any> {
    return this._http.delete(`${this._baseURL}/deleteImageUsingID?imageId=${imageId}`).pipe(
      map(({ data }: any) => data))
  }
}