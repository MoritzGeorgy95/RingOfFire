import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGameManualComponent } from './dialog-game-manual.component';

describe('DialogGameManualComponent', () => {
  let component: DialogGameManualComponent;
  let fixture: ComponentFixture<DialogGameManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGameManualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGameManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
