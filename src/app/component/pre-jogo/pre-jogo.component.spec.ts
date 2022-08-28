import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreJogoComponent } from './pre-jogo.component';

describe('PreJogoComponent', () => {
  let component: PreJogoComponent;
  let fixture: ComponentFixture<PreJogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreJogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
