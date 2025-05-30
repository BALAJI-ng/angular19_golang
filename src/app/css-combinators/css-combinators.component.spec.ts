import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssCombinatorsComponent } from './css-combinators.component';

describe('CssCombinatorsComponent', () => {
  let component: CssCombinatorsComponent;
  let fixture: ComponentFixture<CssCombinatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CssCombinatorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssCombinatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
