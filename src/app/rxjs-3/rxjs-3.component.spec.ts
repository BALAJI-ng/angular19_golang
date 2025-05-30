import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rxjs3Component } from './rxjs-3.component';

describe('Rxjs3Component', () => {
  let component: Rxjs3Component;
  let fixture: ComponentFixture<Rxjs3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rxjs3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rxjs3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
