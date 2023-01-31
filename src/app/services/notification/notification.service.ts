import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(title: string): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      data: { message: title }
    })
  }
}
