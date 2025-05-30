import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbacAdminComponent } from './rbac-admin.component';

describe('RbacAdminComponent', () => {
  let component: RbacAdminComponent;
  let fixture: ComponentFixture<RbacAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RbacAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbacAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
