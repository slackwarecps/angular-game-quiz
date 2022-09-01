import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  DocumentChangeAction,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Jogo } from '../models/jogo';
import { JogadorStrategy } from './strategies/jogador-strategy';
import { Jogador1StrategyService } from './strategies/jogador1-strategy.service';
import { Jogador2StrategyService } from './strategies/jogador2-strategy.service';

@Injectable({
  providedIn: 'root',
})
export class PreJogoService {
  readonly JOGOS_COLLECTION = 'jogos/';
  readonly JOGOS_QTD_JOGADORES = 'qtdJogadores';

  personagem: string | null = null;
  jogos!: Observable<DocumentChangeAction<Jogo>[]>;
  jogo?: Jogo | null;
  jogoDoc!: AngularFirestoreDocument<Jogo>;
  nomeJogador!: string;
  jogadorStrategy!: JogadorStrategy;

  constructor(
    private afs: AngularFirestore,
    private jogador1StrategyService: Jogador1StrategyService,
    private jogador2StrategyService: Jogador2StrategyService
  ) {}

  obterJogosDisponiveis() {
    console.log('Jogos disponiveis..');
    this.jogos = this.afs
      .collection<Jogo>(this.JOGOS_COLLECTION, (ref) =>
        ref.where(this.JOGOS_QTD_JOGADORES, '<=', 1).orderBy(this.JOGOS_QTD_JOGADORES, 'desc')
      )
      .snapshotChanges();

    console.log(this.jogos);
  }

  selecionarPersonagem(personagem: string) {
    console.log('pre-jogo service >> selecionar personagem', personagem);
    this.personagem = personagem;
    this.jogo = null; // necessário para um segundo jogo
    this.jogos.subscribe((jogosDoc: DocumentChangeAction<Jogo>[]) => {
      for (let i in jogosDoc) {
        if (!this.jogo) {
          this.selecionarJogo(jogosDoc[i]);
        }
      }
    });
  }

  selecionarJogo(jogoDoc: DocumentChangeAction<Jogo>) {
    console.log('selecionou jogo: ', jogoDoc);
    const jogo = jogoDoc.payload.doc;
    this.jogo = jogo.data() as Jogo;
    this.jogo.id = jogo.id;

    console.log('Jogo ', this.jogo);
    console.log('pronto pra inciar jogo....');
    this.iniciarJogo();
  }

  iniciarJogo() {
    console.log('Iniciou o jogo...');
    if (this.jogo?.qtdJogadores == 0) {
      this.jogadorStrategy = this.jogador1StrategyService;
    } else {
      this.jogadorStrategy = this.jogador2StrategyService;
    }

    const dadosJogador = {
      nome: this.nomeJogador,
      personagem: this.personagem,
    };
    this.personagem = null;

    console.info(dadosJogador);
    console.info('qtd jogadores ', this.jogo?.qtdJogadores);

    this.jogadorStrategy.executar(this.jogo, dadosJogador);
  }
}
