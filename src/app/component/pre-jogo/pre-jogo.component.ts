import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { PreJogoService } from 'src/app/services/pre-jogo.service';

@Component({
  selector: 'app-pre-jogo',
  templateUrl: './pre-jogo.component.html',
  styleUrls: ['./pre-jogo.component.css'],
})
export class PreJogoComponent implements OnInit {
  readonly P_FADA_VERMELHA = 'fada-vermelha';
  readonly P_ELFO_VERDE = 'elfo-verde';
  readonly P_ELFO_AZUL = 'elfo-azul';
  readonly P_ARQUEIRA = 'arqueira';

  nome: string = '';

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private preJogoService: PreJogoService
  ) {}

  ngOnInit() {
    this.validarAutenticacao();
    this.preJogoService.obterJogosDisponiveis();
  }

  validarAutenticacao() {
    this.fireauth.authState.subscribe(
      (dataReceived) => {
        this.preJogoService.nomeJogador = 'admin';

        console.log(dataReceived);
      },
      (erro) => {
        console.log(erro);
        this.router.navigate(['/']);
      }
    );

    // this.afAuth.authState.subscribe((authState) => {
    //   if (authState) {
    //     this.preJogoService.nomeJogador = authState.email.split('@')[0];
    //   } else {
    //     this.router.navigate(['/']);
    //   }
    // });
  }

  selecionarPersonagem(personagem: string) {
    if (this.preJogoService.personagem) {
      return;
    }
    this.preJogoService.selecionarPersonagem(personagem);
  }

  get personagem() {
    //return '';
    return this.preJogoService.personagem;
  }

  sair() {
    this.fireauth.signOut();
    this.router.navigate(['/']);
  }
}
