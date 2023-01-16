import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UploadImageComponent } from './pages/upload-image/upload-image.component';
import { ShowImagesComponent } from './pages/show-images/show-images.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { FormsModule } from '@angular/forms';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ApiInterceptorService } from './services/api-interceptor/api-interceptor.service';
import { ConfirmationDialogueComponent } from './components/confirmation-dialogue/confirmation-dialogue.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadImageComponent,
    ShowImagesComponent,
    FooterComponent,
    SidebarComponent,
    FileSizePipe,
    DragAndDropDirective,
    SnackbarComponent,
    LoaderComponent,
    ConfirmationDialogueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
