import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbacUnauthorizedComponent } from './rbac-unauthorized.component';

describe('RbacUnauthorizedComponent', () => {
  let component: RbacUnauthorizedComponent;
  let fixture: ComponentFixture<RbacUnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RbacUnauthorizedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbacUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
