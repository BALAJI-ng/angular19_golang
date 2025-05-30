import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAndRxResourceComponent } from './resource-and-rx-resource.component';

describe('ResourceAndRxResourceComponent', () => {
  let component: ResourceAndRxResourceComponent;
  let fixture: ComponentFixture<ResourceAndRxResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceAndRxResourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceAndRxResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
