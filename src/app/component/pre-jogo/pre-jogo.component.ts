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

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private preJogoService: PreJogoService
  ) {}

  ngOnInit() {
    this.validarAutenticacao();
    this.preJogoService.obterJogosDisponiveis();
  }

  validarAutenticacao() {
    this.afAuth.authState.subscribe((authState) => {
      if (authState) {
        if (authState.email != undefined)
          this.preJogoService.nomeJogador = authState.email?.split('@')[0];
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  selecionarPersonagem(personagem: string) {
    console.log('Pre jogo Componente:: selecionar personagem:', personagem);
    if (this.preJogoService.personagem != undefined) {
      console.log('retorna ...');
      return;
    }
    this.preJogoService.selecionarPersonagem(personagem);
  }

  get personagem() {
    return this.preJogoService.personagem;
  }

  sair() {
    console.log('saiu do pre jogo deslogando.....');
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
