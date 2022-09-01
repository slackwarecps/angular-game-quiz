import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { JogadorStrategy } from './jogador-strategy';
import { Jogo } from 'src/app/models/jogo';
import { DadosJogador } from 'src/app/models/dados-jogador';
import { Pergunta } from 'src/app/models/pergunta';

@Injectable({
  providedIn: 'root',
})
export class Jogador1StrategyService extends JogadorStrategy {
  procurar(string: String) {}

  constructor(afs: AngularFirestore, router: Router, snackBar: MatSnackBar) {
    super(afs, router, snackBar);
  }

  executar(jogo: Jogo, dadosJogador: DadosJogador) {
    console.log('strategy 1 : ', jogo, dadosJogador);
    jogo.dataAtualizacao = new Date().getTime();
    jogo.jogador1 = dadosJogador;
    jogo.qtdJogadores++;
    if (jogo.qtdJogadores) console.log('qtd strategia 1: ', jogo.qtdJogadores);
    super.atualizarDadosJogoFirebase(jogo);
  }
}
