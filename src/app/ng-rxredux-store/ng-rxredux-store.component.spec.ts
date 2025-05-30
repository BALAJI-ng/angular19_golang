import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgRxreduxStoreComponent } from './ng-rxredux-store.component';

describe('NgRxreduxStoreComponent', () => {
  let component: NgRxreduxStoreComponent;
  let fixture: ComponentFixture<NgRxreduxStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgRxreduxStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgRxreduxStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
