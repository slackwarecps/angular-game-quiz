import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pergunta } from 'src/app/models/pergunta';

@Component({
  selector: 'app-dialog1',
  templateUrl: './dialog1.component.html',
  styleUrls: ['./dialog1.component.css'],
})
export class Dialog1Component implements OnInit {
  perguntaId?: string;
  pergunta?: Pergunta | null;
  form = this.fb.group({
    questao: [this.perguntaForm?.questao, [Validators.required]],
    opcao1: [this.perguntaForm?.opcoes[0], [Validators.required]],
    opcao2: [this.perguntaForm?.opcoes[1], [Validators.required]],
    opcao3: [this.perguntaForm?.opcoes[2], [Validators.required]],
    opcao4: [this.perguntaForm?.opcoes[3], [Validators.required]],
    correta: [this.perguntaForm?.correta, [Validators.required]],
  });

  perguntaForm?: Pergunta;
  formCor?: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<Dialog1Component>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.perguntaForm = this.obterDadosPergunta(this.data);
    this.gerarForm();
  }

  obterDadosPergunta(data: any): Pergunta {
    if (!data) {
      // cadastro
      return { questao: '', opcoes: Array<string>(4), correta: -1 };
    }
    // atualização
    this.perguntaId = data.pergunta.id;
    return data.pergunta as Pergunta;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  gerarForm() {
    console.log('Gera Forma ');
    this.form = this.fb.group({
      questao: [this.perguntaForm?.questao, [Validators.required]],
      opcao1: [this.perguntaForm?.opcoes[0], [Validators.required]],
      opcao2: [this.perguntaForm?.opcoes[1], [Validators.required]],
      opcao3: [this.perguntaForm?.opcoes[2], [Validators.required]],
      opcao4: [this.perguntaForm?.opcoes[3], [Validators.required]],
      correta: [this.perguntaForm?.correta, [Validators.required]],
    });
  }

  enviar() {
    if (this.form.invalid) {
      this.pergunta = null;
    } else {
      const dados: any = this.form.value;
      const opcoes: Array<string> = [dados.opcao1, dados.opcao2, dados.opcao3, dados.opcao4];
      this.pergunta = {
        questao: dados.questao,
        opcoes: opcoes,
        correta: dados.correta,
      };
    }
    this.dialogRef.close({
      pergunta: this.pergunta,
      id: this.perguntaId,
    });
  }

  fecharDialog() {
    this.dialogRef.close();
  }
}
