import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Jogo } from 'src/app/models/jogo';
import { DadosJogador } from 'src/app/models/dados-jogador';
import { Pergunta } from 'src/app/models/pergunta';

export abstract class JogadorStrategy {
  readonly JOGOS_COLLECTION = 'jogos/';
  readonly JOGO_DOCUMENT = '/jogo/';
  readonly SNACKBAR_DURATION = { duration: 5000 };

  constructor(
    protected afs: AngularFirestore,
    protected router: Router,
    protected snackBar: MatSnackBar
  ) {}

  abstract procurar(string: String): void;

  abstract executar(jogo: Jogo | null | undefined, dadosJogador: DadosJogador): void;

  atualizarDadosJogoFirebase(jogo: Jogo) {
    const jogosCollectionUrl = this.JOGOS_COLLECTION + jogo.id;
    const jogoUrl = this.JOGO_DOCUMENT + jogo.id;

    console.log('vou atualizar o jogo.... antes de chamar a tela de jogo...');
    console.log({ jogo });
    this.afs
      .doc<Jogo>(jogosCollectionUrl)
      .update(jogo)
      .then((res) => {
        console.log('redicionar para jogo aqui....');
        this.router.navigate([jogoUrl]);
      })
      .catch((err) =>
        this.snackBar.open(
          'Erro ao iniciar o jogo, tente novamente.',
          'Erro',
          this.SNACKBAR_DURATION
        )
      );
  }
}
