import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAtoutputComponent } from './child-atoutput.component';

describe('ChildAtoutputComponent', () => {
  let component: ChildAtoutputComponent;
  let fixture: ComponentFixture<ChildAtoutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildAtoutputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildAtoutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
