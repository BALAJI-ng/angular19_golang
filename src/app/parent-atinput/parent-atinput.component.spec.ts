import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAtinputComponent } from './parent-atinput.component';

describe('ParentAtinputComponent', () => {
  let component: ParentAtinputComponent;
  let fixture: ComponentFixture<ParentAtinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentAtinputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentAtinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
