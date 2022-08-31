import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogosFormDialogComponent } from './jogos-form-dialog.component';

describe('JogosFormDialogComponent', () => {
  let component: JogosFormDialogComponent;
  let fixture: ComponentFixture<JogosFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogosFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogosFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
