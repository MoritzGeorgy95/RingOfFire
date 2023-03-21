import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InforCardComponent } from './infor-card.component';

describe('InforCardComponent', () => {
  let component: InforCardComponent;
  let fixture: ComponentFixture<InforCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InforCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InforCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
