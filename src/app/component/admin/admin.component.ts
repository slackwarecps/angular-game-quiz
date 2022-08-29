import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Pergunta } from 'src/app/models/pergunta';
import { AuthService } from 'src/app/shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { PerguntasService } from 'src/app/services/perguntas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { JogoService } from 'src/app/services/jogo.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Dialog1Component } from './dialogs/dialog1/dialog1.component';
import { Observable } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  colunas = ['pergunta', 'opcoes', 'correta', 'acao'];
  dataSourcex?: MatTableDataSource<Pergunta>;

  dataSource = ELEMENT_DATA;
  dataSource$?: Observable<Pergunta[]>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private dialog: MatDialog,
    private perguntasService: PerguntasService // private jogoService: JogoService
  ) {}

  ngOnInit() {
    // this.validarAutenticacao();

    // this.perguntasService.obterPerguntas().subscribe((perguntas) => {
    //   this.dataSource = new MatTableDataSource<Pergunta>(perguntas);

    //   //this.dataSource.paginator = this.paginator;
    // });

    this.dataSource$ = this.perguntasService.obterPerguntas();
  }

  validarAutenticacao() {
    this.afAuth.authState.subscribe((authState) => {
      if (!authState || authState.email != environment.adminEmail) {
        this.router.navigate(['/']);
      }
    });
  }

  sair() {
    this.afAuth.signOut();
  }

  cadastrar() {
    // this.dialog
    //   .open(PerguntaFormDialogComponent)
    //   .afterClosed()
    //   .subscribe((data) => {
    //     if (data && data.pergunta !== null) {
    //       this.perguntasService.cadastrar(data.pergunta);
    //     }
    //   });

    const dialogRef = this.dialog.open(Dialog1Component);

    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.pergunta !== null) {
        console.log(data);
        this.perguntasService.cadastrar(data.pergunta);
      }
      console.log('The dialog was closed');
    });
  }

  atualizar($event: any, pergunta: Pergunta) {
    // $event.preventDefault();
    // this.dialog
    //   .open(PerguntaFormDialogComponent, { data: { pergunta: pergunta } })
    //   .afterClosed()
    //   .subscribe((data) => {
    //     if (data && data.pergunta !== null) {
    //       this.perguntasService.atualizar(data.pergunta, data.id);
    //     }
    //   });
  }

  remover($event: any, perguntaId: string) {
    // $event.preventDefault();
    // this.dialog
    //   .open(ConfirmarRemoverDialogComponent, { data: { perguntaId: perguntaId } })
    //   .afterClosed()
    //   .subscribe((data) => {
    //     if (data) {
    //       this.perguntasService.remover(data.perguntaId);
    //     }
    //   });
  }

  confirmarRestauracaoDados() {
    // this.dialog
    //   .open(ConfirmarRestauracaoDialogComponent)
    //   .afterClosed()
    //   .subscribe((resposta) => {
    //     if (resposta) {
    //       this.perguntasService.restaurarPerguntas();
    //     }
    //   });
  }

  inicializarJogos() {
    // this.dialog
    //   .open(JogosFormDialogComponent)
    //   .afterClosed()
    //   .subscribe((data) => {
    //     if (data) {
    //       this.jogoService.inicializarJogos(data);
    //     }
    //   });
  }
}
