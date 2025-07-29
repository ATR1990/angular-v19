import {Component, Inject, EventEmitter, ChangeDetectionStrategy} from '@angular/core'

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog"
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'sk-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConfirmModalComponent {
  onConfirm = new EventEmitter()

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
