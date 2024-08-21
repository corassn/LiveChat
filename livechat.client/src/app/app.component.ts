import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './shared/user-dialog/user-dialog.component';
import { CoreFacade } from './core/core.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  currentUser = signal('');

  coreFacade = inject(CoreFacade);

  ngOnInit(): void {
    this.openUserDialog();
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: { username: this.currentUser() },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currentUser.set(result);
        this.coreFacade.setCurrentUser(this.currentUser());
      }
    })
  }
}
