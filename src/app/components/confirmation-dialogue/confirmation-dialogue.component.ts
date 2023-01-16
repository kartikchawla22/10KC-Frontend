import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfrimationDialogueType } from 'src/app/utils/types';


@Component({
  selector: 'app-confirmation-dialogue',
  templateUrl: './confirmation-dialogue.component.html'
})
export class ConfirmationDialogueComponent {
  constructor(private _dialogRef: MatDialogRef<ConfirmationDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfrimationDialogueType) {
  }

  onConfirm(): void {
    // Close the dialog, return true
    this._dialogRef.close({ selection: true, imageId: this.data.imageId });
  }

  onDismiss(): void {
    // Close the dialog, return false
    this._dialogRef.close({ selection: false, imageId: 0 });
  }
}
