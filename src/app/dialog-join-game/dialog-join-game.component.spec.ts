import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJoinGameComponent } from './dialog-join-game.component';

describe('DialogJoinGameComponent', () => {
  let component: DialogJoinGameComponent;
  let fixture: ComponentFixture<DialogJoinGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogJoinGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogJoinGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
