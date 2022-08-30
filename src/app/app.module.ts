import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './component/admin/admin.component';
import { Dialog1Component } from './component/admin/dialogs/dialog1/dialog1.component';
import { JogoComponent } from './component/jogo/jogo.component';
import { LoginComponent } from './component/login/login.component';
import { PreJogoComponent } from './component/pre-jogo/pre-jogo.component';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmarRemoverDialogComponent } from './component/admin/dialogs/confirmar-remover-dialog/confirmar-remover-dialog.component';
import { Form1Component } from './component/form1/form1.component';
import { ConfirmarRestauracaoDialogComponent } from './component/admin/dialogs/confirmar-restauracao-dialog/confirmar-restauracao-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PreJogoComponent,
    LoginComponent,
    JogoComponent,
    AdminComponent,
    Dialog1Component,
    ConfirmarRemoverDialogComponent,
    ConfirmarRestauracaoDialogComponent,
    Form1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
