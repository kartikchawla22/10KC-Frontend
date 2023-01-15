import { Component, Inject } from '@angular/core';
import {
  MatSnackBar,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { NotificationDataType } from 'src/app/utils/types';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  constructor(private _snackBar: MatSnackBar, @Inject(MAT_SNACK_BAR_DATA) public data: NotificationDataType) { }

  closeSnackBar(): void {
    this._snackBar.dismiss()
  }
}
