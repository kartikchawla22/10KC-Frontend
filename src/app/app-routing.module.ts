import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowImagesComponent } from './pages/show-images/show-images.component';
import { UploadImageComponent } from './pages/upload-image/upload-image.component';

const routes: Routes = [
  { path: "showImages", component: ShowImagesComponent },
  { path: 'upload', component: UploadImageComponent },
  { path: "**", redirectTo: "upload" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
