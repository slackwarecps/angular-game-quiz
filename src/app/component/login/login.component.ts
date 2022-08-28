import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  cadastro?: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    // this.meuAuth.logout();
  }

  gerarForm() {
    // this.form = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   senha: ['', [Validators.required, Validators.minLength(6)]]
    // });
  }

  logarGoogle() {
    // this.afAuth.auth
    //   .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    //   .then((res) => this.router.navigate([this.PRE_JOGO_PATH]))
    //   .catch((err) =>
    //     this.snackBar.open('Problema ao autenticar no Google.', 'Erro', { duration: 5000 })
    //   );
  }

  logarEmail() {
    // if (this.form.invalid) {
    //   return;
    // }
    // const dados = this.form.value;
    // this.afAuth.auth
    //   .signInWithEmailAndPassword(dados.email, dados.senha)
    //   .then(res  => this.router.navigate([this.PRE_JOGO_PATH]))
    //   .catch(err => this.snackBar.open(
    //           'Usuário/senha inválido(s)',
    //     	  'Erro', { duration: 5000 })
    // );
  }

  cadastrarEmail() {
    // if (this.form.invalid) {
    //   return;
    // }
    // const dados = this.form.value;
    // this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(
    //   dados.email, dados.senha)
    //   .then(res  => this.router.navigate([this.PRE_JOGO_PATH]))
    //   .catch(err => this.snackBar.open(
    //           'Problema ao cadastrar email.',
    //     	  'Erro', { duration: 5000 })
    // );
  }

  exibirCadastro() {
    this.cadastro = true;
  }

  exibirLogin() {
    this.cadastro = false;
  }
}
