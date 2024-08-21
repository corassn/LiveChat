import { Component, inject, model } from '@angular/core';
import { USER_DIALOG_TITLE, USERNAME_INPUT_PLACEHOLDER } from '../_constants/user-dialog.constants';
import { SAVE_TEXT } from '../_constants/common.constants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDialogData } from './user-dialog-data.interface';

@Component({
  selector: 'user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UserDialogComponent>);
  readonly data = inject<UserDialogData>(MAT_DIALOG_DATA);
  readonly username = model(this.data.username);

  title = USER_DIALOG_TITLE;
  saveText = SAVE_TEXT;
  placeholder = USERNAME_INPUT_PLACEHOLDER;
}
