import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbacDashboardComponent } from './rbac-dashboard.component';

describe('RbacDashboardComponent', () => {
  let component: RbacDashboardComponent;
  let fixture: ComponentFixture<RbacDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RbacDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbacDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
