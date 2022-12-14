import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pergunta } from '../models/pergunta';

@Injectable({
  providedIn: 'root',
})
export class PerguntasService {
  readonly PERGUNTAS_COLLECTION: string = 'perguntas';
  readonly SNACKBAR_DURATION: any = { duration: 5000 };
  private perguntasCollection: AngularFirestoreCollection<Pergunta>;

  constructor(private afs: AngularFirestore, private snackBar: MatSnackBar) {
    this.perguntasCollection = this.afs.collection<Pergunta>(this.PERGUNTAS_COLLECTION);
  }

  obterPerguntas(): Observable<Pergunta[]> {
    //recebe e converte para pergunrtas.
    return this.perguntasCollection.snapshotChanges().pipe(map(this.mapearIds));
  }

  async testeBatch() {
    const listaNova = await this.afs.collection(this.PERGUNTAS_COLLECTION).ref.get();

    //--create batch--
    let batch = this.afs.firestore.batch();

    console.log('batch 1', batch);
    // apagar cada registro
    listaNova.forEach((pergunta) => {
      batch.delete(pergunta.ref);
      console.log(pergunta);
    });
    // console.log(pergunta.id);
    console.log('batch 3');
    //--finally--
    return batch.commit();
  }

  obterPerguntas2() {
    //recebe e converte para pergunrtas.
    return this.perguntasCollection.snapshotChanges();
  }

  mapearIds(perguntas: DocumentChangeAction<Pergunta>[]): Pergunta[] {
    return perguntas.map((objPergunta) => {
      const pergunta = objPergunta.payload.doc.data() as Pergunta;
      pergunta.id = objPergunta.payload.doc.id;
      return pergunta;
    });
  }

  cadastrar(pergunta: Pergunta) {
    this.perguntasCollection
      .add(pergunta)
      .then((res) =>
        this.snackBar.open('Pergunta adicionada com sucesso!', 'OK', this.SNACKBAR_DURATION)
      )
      .catch((err) =>
        this.snackBar.open('Erro ao adicionar pergunta.', 'Erro', this.SNACKBAR_DURATION)
      );
  }

  atualizar(pergunta: Pergunta, perguntaId: string) {
    this.afs
      .doc<Pergunta>(`${this.PERGUNTAS_COLLECTION}/${perguntaId}`)
      .update(pergunta)
      .then((res) =>
        this.snackBar.open('Pergunta atualizada com sucesso!', 'OK', this.SNACKBAR_DURATION)
      )
      .catch((err) =>
        this.snackBar.open('Erro ao atualizar pergunta.', 'Erro', this.SNACKBAR_DURATION)
      );
  }

  remover(perguntaId: string) {
    this.afs
      .doc<Pergunta>(`${this.PERGUNTAS_COLLECTION}/${perguntaId}`)
      .delete()
      .then((res) =>
        this.snackBar.open('Pergunta removida com sucesso!', 'OK', this.SNACKBAR_DURATION)
      )
      .catch((err) =>
        this.snackBar.open('Erro ao excluir pergunta.', 'Erro', this.SNACKBAR_DURATION)
      );
  }

  restaurarPerguntas() {
    this.removerTodasPerguntas().then((res) => this.adicionarPerguntas());
  }

  async removerTodasPerguntas(): Promise<void> {
    const listaNova = await this.afs.collection(this.PERGUNTAS_COLLECTION).ref.get();
    // console.log('lista nova: ', listaNova);
    console.log({ listaNova });

    let batch = this.afs.firestore.batch();

    //insiro cada delete....
    listaNova.forEach((itemLista) => {
      batch.delete(itemLista.ref);
    });

    return batch.commit();
  }

  adicionarPerguntas() {
    const perguntas = this.obterPerguntasExemplo();
    for (let i in perguntas) {
      const pergunta: Pergunta = {
        questao: perguntas[i].questao,
        opcoes: perguntas[i].opcoes,
        correta: perguntas[i].correta,
      };
      this.perguntasCollection.add(pergunta);
    }
    this.snackBar.open('Dados restaurados com sucesso!', 'OK', this.SNACKBAR_DURATION);
  }

  obterPerguntasExemplo() {
    return [
      {
        questao: 'Como se diz "azul" em ingl??s?',
        opcoes: ['Black', 'Blue', 'Green', 'Purple'],
        correta: 1,
      },
      {
        questao: 'Como se diz "verde" em ingl??s?',
        opcoes: ['Green', 'Blue', 'Black', 'Purple'],
        correta: 0,
      },
      {
        questao: 'Como se diz "preto" em ingl??s?',
        opcoes: ['Pink', 'Blue', 'Black', 'Purple'],
        correta: 2,
      },
      {
        questao: 'Como se diz "vermelho" em ingl??s?',
        opcoes: ['Black', 'Blue', 'Red', 'Purple'],
        correta: 2,
      },
      {
        questao: 'Como se diz "amarelo" em ingl??s?',
        opcoes: ['Green', 'Blue', 'Black', 'Yellow'],
        correta: 3,
      },
      {
        questao: 'Como se diz "branco" em ingl??s?',
        opcoes: ['White', 'Blue', 'Black', 'Purple'],
        correta: 0,
      },
      {
        questao: 'Como se diz "cinza" em ingl??s?',
        opcoes: ['Green', 'Gray', 'Black', 'Purple'],
        correta: 1,
      },
      {
        questao: 'Como se diz "Roxo" em ingl??s?',
        opcoes: ['Green', 'Blue', 'Black', 'Purple'],
        correta: 3,
      },
      {
        questao: 'Como se diz "Rosa" em ingl??s?',
        opcoes: ['Green', 'Blue', 'Pink', 'Purple'],
        correta: 2,
      },
      {
        questao: 'Como se diz "laranja" em ingl??s?',
        opcoes: ['Green', 'Blue', 'Black', 'Orange'],
        correta: 3,
      },
      {
        questao: 'Como se diz "azul" em ingl??s?',
        opcoes: ['Green', 'Blue', 'Black', 'Purple'],
        correta: 1,
      },
      {
        questao: 'Como se diz "verde" em ingl??s?',
        opcoes: ['Green', 'Blue', 'Black', 'Purple'],
        correta: 0,
      },
      {
        questao: 'Como se diz "preto" em ingl??s?',
        opcoes: ['Green', 'Blue', 'Black', 'Purple'],
        correta: 2,
      },
      {
        questao: 'Como se diz "vermelho" em ingl??s?',
        opcoes: ['Green', 'Blue', 'Red', 'Purple'],
        correta: 2,
      },
      {
        questao: 'Como se diz "amarelo" em ingl??s?',
        opcoes: ['Green', 'Blue', 'Black', 'Yellow'],
        correta: 3,
      },
      {
        questao: 'Como se diz "branco" em ingl??s?',
        opcoes: ['White', 'Blue', 'Black', 'Purple'],
        correta: 0,
      },
      {
        questao: 'Como se diz "cinza" em ingl??s?',
        opcoes: ['Green', 'Gray', 'Black', 'Purple'],
        correta: 1,
      },
      {
        questao: 'Como se diz "Roxo" em ingl??s?',
        opcoes: ['Green', 'Blue', 'Black', 'Purple'],
        correta: 3,
      },
      {
        questao: 'Como se diz "Rosa" em ingl??s?',
        opcoes: ['Green', 'Blue', 'Pink', 'Purple'],
        correta: 2,
      },
      {
        questao: 'Como se diz "laranja" em ingl??s?',
        opcoes: ['Green', 'Blue', 'Black', 'Orange'],
        correta: 3,
      },
    ];
  }
}
