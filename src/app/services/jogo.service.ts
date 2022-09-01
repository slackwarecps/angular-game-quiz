import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Jogo } from '../models/jogo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JogoService {
  readonly JOGOS_DOC_PATH = 'jogos/';
  readonly SNACKBAR_DURATION: any = { duration: 5000 };
  readonly MSG_CORRETA = 'Certa resposta!';
  readonly MSG_INCORRETA = 'Resposta incorreta.';
  readonly MSG_VENCEU = ' venceu.';
  readonly MSG_VITORIA_ABANDONO = 'Você venceu porque seu adversário abandonou o jogo!';
  readonly NUM_QUESTOES = 5;
  readonly QTD_PONTOS_TOTAIS = 150;
  readonly JOGADOR_1 = 0;
  readonly JOGADOR_2 = 1;
  readonly NENHUMA_SELECAO = -1;

  perguntaAtual: any;
  msgPopup?: string;
  aguardandoOponente?: boolean;
  mostrarPopup?: boolean;
  nomeJogador?: string;
  fimJogo?: boolean;
  jogoDoc?: AngularFirestoreDocument<Jogo>;
  jogoObserver?: Observable<Jogo>;
  jogo?: Jogo;

  constructor(
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private afAuth: AngularFireAuth // private animacaoService: AnimacaoService
  ) {}

  adicionarJogosPadrao(qtdJogos: number) {
    if (qtdJogos <= 0) {
      return;
    }
    let jogosCollection: AngularFirestoreCollection<Jogo>;
    jogosCollection = this.afs.collection<Jogo>(this.JOGOS_DOC_PATH);
    for (let i = 0; i < qtdJogos; i++) {
      const jogo: Jogo = { qtdJogadores: 0 };
      jogosCollection.add(jogo);
    }
    this.snackBar.open('Jogos inicializados com sucesso!', 'OK', this.SNACKBAR_DURATION);
  }

  async removerTodosJogos(): Promise<void> {
    const listaNova = await this.afs.collection(this.JOGOS_DOC_PATH).ref.get();
    let batch = this.afs.firestore.batch();
    listaNova.forEach((jogo) => {
      batch.delete(jogo.ref);
    });
    return batch.commit();
  }

  inicializarJogos(data: any) {
    if (data.manterJogosExistentes) {
      this.adicionarJogosPadrao(data.qtdJogos);
    } else {
      this.removerTodosJogos()
        .then((res) => this.adicionarJogosPadrao(data.qtdJogos))
        .catch((err) =>
          this.snackBar.open('Erro ao inicializar jogos.', 'Erro', this.SNACKBAR_DURATION)
        );
    }
  }

  iniciarRecursos(jogoId: string) {
    console.log('iniciando recursos....');
    this.aguardandoOponente = true;
    this.mostrarPopup = false;
    this.fimJogo = false;
    this.perguntaAtual = { questao: '', opcoes: [] };
    this.jogoDoc = this.afs.doc<Jogo>(this.JOGOS_DOC_PATH + jogoId);

    //  this.jogoObserver = this.jogoDoc.valueChanges();
  }

  iniciarJogo() {
    console.log('jogo.service-iniciarJogo...');
    this.obterNomeJogador();
    this.jogoDoc?.valueChanges().subscribe((jogo) => {
      if (this.perguntaAtual.questao == '' && jogo?.questoes) {
        this.perguntaAtual = jogo.questoes[0];
      }
      if (this.fimJogo) {
        return;
      }
      if (this.jogo != null) {
        this.jogo = jogo;
        this.atualizarJogo();
        this.mostrarPopup = true;
      }
      if (jogo?.qtdJogadores == 2 && !this.jogo) {
        this.jogo = jogo;
        this.iniciarAnimacao();
        this.aguardandoOponente = false;
      }
      if (jogo?.qtdJogadores == 0) {
        this.vitoriaPorAbandono();
      }
    });
  }

  obterNomeJogador() {
    this.afAuth.authState.subscribe((authState) => {
      if (authState) {
        if (authState.email != null) this.nomeJogador = authState.email.split('@')[0];
      }
    });
  }

  atualizarJogo() {
    console.log('atualizar Jogo .... ');
    if (this.jogo?.questaoCorreta) {
      this.msgPopup = this.MSG_CORRETA;
      // this.animacaoService.atacar(this.obterJogadorAnterior());
    } else {
      this.msgPopup = this.MSG_INCORRETA;
    }
    this.verificarFimJogo();

    console.log(this.jogo?.questoes);

    // this.perguntaAtual = this.jogo.questoes[this.jogo.questaoNum];
  }

  vitoriaPorAbandono() {
    this.msgPopup = this.MSG_VITORIA_ABANDONO;
    this.fimJogo = true;
  }

  verificarFimJogo() {
    if (this.jogador1Venceu()) {
      this.msgPopup = this.jogo?.jogador1?.nome + this.MSG_VENCEU;
      this.fimJogo = true;
    }
    if (this.jogador2Venceu()) {
      this.msgPopup = this.jogo?.jogador2?.nome + this.MSG_VENCEU;
      this.fimJogo = true;
    }
    if (this.fimJogo) {
      this.restaurarJogo();
    }
  }

  jogador1Venceu(): boolean {
    return this.jogo?.placar?.jogador1.acertos == this.NUM_QUESTOES;
  }

  jogador2Venceu(): boolean {
    if (this.jogo != undefined) return this.jogo.placar?.jogador2.acertos == this.NUM_QUESTOES;
    else return false;
  }

  restaurarJogo(): Promise<void> {
    if (this.jogoDoc == undefined) {
      return new Promise((resolve) => resolve());
    } else {
      return this.jogoDoc.update({ qtdJogadores: 0 });
    }
  }

  aguardarJogadaAdversario(): boolean {
    if (!this.nomeJogador || !this.jogo) {
      return false;
    }
    let jogLocal: number = this.JOGADOR_1;
    if (this.jogo?.jogador2?.nome == this.nomeJogador) {
      jogLocal = this.JOGADOR_2;
    }
    return jogLocal != this.jogo.vezJogar;
    return false;
  }

  confirmar() {
    if (this.fimJogo) {
      return;
    }
    if (this.jogo != undefined) {
      this.jogo.questaoCorreta = this.verificarQuestaoCorreta();
      if (this.jogo.questaoCorreta) {
        this.atualizarPlacar();
        // this.animacaoService.atacar(this.jogo.vezJogar);
      }

      this.atualizarVezJogar();
      this.jogo.questaoSel = this.NENHUMA_SELECAO;
      if (this.jogo.questaoNum != undefined) this.jogo.questaoNum++;

      if (this.jogo.questaoNum != undefined) {
        if (this.jogo.questoes != undefined)
          if (this.jogo.questoes.length == this.jogo.questaoNum) {
            this.jogo.questaoNum = 0;
          }
      }
    }
    if (this.jogo != null) {
      if (this.jogo.questaoNum != null)
        if (this.jogo.questoes != null)
          this.perguntaAtual = this.jogo.questoes[this.jogo.questaoNum];
    }

    if (this.jogoDoc != null && this.jogo != null) this.jogoDoc.update(this.jogo);
  }

  verificarQuestaoCorreta(): boolean {
    if (this.jogo != undefined) {
      return this.perguntaAtual.correta == this.jogo.questaoSel;
    } else {
      return false;
    }
  }

  atualizarPlacar() {
    if (
      this.jogo != undefined &&
      this.jogo.vezJogar != undefined &&
      this.jogo.placar != undefined
    ) {
      if (this.jogo.vezJogar == this.JOGADOR_1) {
        this.jogo.placar.jogador1.acertos++;
      } else {
        this.jogo.placar.jogador2.acertos++;
      }
    }
  }

  atualizarVezJogar() {
    if (this.jogo != undefined) {
      switch (this.jogo.vezJogar) {
        case this.JOGADOR_1:
          this.jogo.vezJogar = this.JOGADOR_2;
          break;
        case this.JOGADOR_2:
          this.jogo.vezJogar = this.JOGADOR_1;
          break;
      }
    }
  }

  iniciarAnimacao() {
    const forcaHit: number = Math.ceil(this.QTD_PONTOS_TOTAIS / this.NUM_QUESTOES);

    // this.animacaoService.iniciarAnimacao(
    //   [this.jogo.jogador1.personagem, this.jogo.jogador2.personagem],
    //   this.NUM_QUESTOES,
    //   this.QTD_PONTOS_TOTAIS,
    //   this.jogo.jogador1.nome,
    //   this.jogo.placar.jogador2.acertos * forcaHit,
    //   this.jogo.jogador2.nome,
    //   this.jogo.placar.jogador1.acertos * forcaHit
    // );
  }

  obterJogadorAnterior(): number {
    let jogadorAnterior: number = this.JOGADOR_1;

    if (this.jogo != undefined) {
      if (this.jogo.vezJogar == this.JOGADOR_1) {
        jogadorAnterior = this.JOGADOR_2;
      }
    }

    return jogadorAnterior;
  }
}
