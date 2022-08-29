import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  readonly PRE_JOGO_PATH: string = '/pre-jogo';
  loginForm!: FormGroup;
  cadastro?: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {}

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
    this.auth.googleSignIn();
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

  logarEmail() {
    if (this.loginForm.invalid) {
      return;
    }
    const dados = this.loginForm.value;
    this.afAuth
      .signInWithEmailAndPassword(dados.email, dados.password)
      .then((res) => this.router.navigate([this.PRE_JOGO_PATH]))
      .catch((err) => this.snackBar.open('Usuário/senha inválido(s)', 'Erro', { duration: 5000 }));
  }

  cadastrarEmail() {
    if (this.loginForm.invalid) {
      return;
    }
    const dados = this.loginForm.value;
    this.afAuth
      .createUserWithEmailAndPassword(dados.email, dados.password)
      .then((res) => this.router.navigate([this.PRE_JOGO_PATH]))
      .catch((err) =>
        this.snackBar.open('Problema ao cadastrar email.', 'Erro', { duration: 5000 })
      );
  }

  exibirCadastro() {
    this.cadastro = true;
  }

  exibirLogin() {
    this.cadastro = false;
  }
}
