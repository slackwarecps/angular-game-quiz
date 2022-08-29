import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-remover-dialog',
  templateUrl: './confirmar-remover-dialog.component.html',
  styleUrls: ['./confirmar-remover-dialog.component.css'],
})
export class ConfirmarRemoverDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmarRemoverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {}

  enviar() {
    this.dialogRef.close({ perguntaId: this.data.perguntaId });
  }

  fecharDialog() {
    this.dialogRef.close();
  }
}
