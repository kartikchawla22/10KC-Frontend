import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteConfirmation } from 'src/app/utils/types';


@Component({
  selector: 'app-confirmation-dialogue',
  templateUrl: './confirmation-dialogue.component.html'
})
export class ConfirmationDialogueComponent {

  constructor(private _dialogRef: MatDialogRef<ConfirmationDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: DeleteConfirmation) {
  }

  onConfirm(): void {
    // Close the dialog, return true
    this._dialogRef.close({ selection: true, imageId: this._data.imageId });
  }

  onDismiss(): void {
    // Close the dialog, return false
    this._dialogRef.close({ selection: false, imageId: 0 });
  }
}
