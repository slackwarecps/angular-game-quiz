import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-restauracao-dialog',
  templateUrl: './confirmar-restauracao-dialog.component.html',
  styleUrls: ['./confirmar-restauracao-dialog.component.css'],
})
export class ConfirmarRestauracaoDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ConfirmarRestauracaoDialogComponent>) {}

  ngOnInit(): void {}

  fecharDialog(resposta: boolean) {
    this.dialogRef.close(resposta);
  }
}
