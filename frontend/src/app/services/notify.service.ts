import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotifyService {

  constructor(private snackBar: MatSnackBar) {}

  success(msg: string) {
    this.open(msg, 'snackbar-success');
  }

  error(msg: string) {
    this.open(msg, 'snackbar-error');
  }

  info(msg: string) {
    this.open(msg, 'snackbar-info');
  }

  private open(msg: string, panelClass: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass]
    });
  }
}
