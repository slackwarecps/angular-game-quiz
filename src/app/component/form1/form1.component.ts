import { Component, OnInit } from '@angular/core';
import { PerguntasService } from 'src/app/services/perguntas.service';
import { Pergunta } from 'src/app/models/pergunta';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css'],
})
export class Form1Component implements OnInit {
  private perguntaslista?: Pergunta[];

  listaDois: any;

  constructor(private perguntas: PerguntasService) {}

  ngOnInit(): void {
    this.perguntas.restaurarPerguntas();
    // this.perguntaslista = this.perguntas.obterPerguntas2();
    // this.perguntas.obterPerguntas2().subscribe((data) => {
    //   this.listaDois = data.map((e) => {
    //     return {
    //       id: e.payload.doc.id,
    //       isEdit: false,
    //       correta: e.payload.doc.data()['correta'],
    //       questao: e.payload.doc.data()['questao'],
    //       // Description: e.payload.doc.data()['Description'],
    //     };
    //   });
    //   console.log('Lista Dois: ', this.listaDois);
    //   this.perguntas.testeBatch(this.listaDois);
    // });
  }
}
