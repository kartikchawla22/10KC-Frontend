import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly _horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private readonly _verticalPosition: MatSnackBarVerticalPosition = 'top';
  private readonly _duration: number = 3000

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(title: string): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      horizontalPosition: this._horizontalPosition,
      verticalPosition: this._verticalPosition,
      duration: this._duration,
      data: { message: title }
    })
  }
}
