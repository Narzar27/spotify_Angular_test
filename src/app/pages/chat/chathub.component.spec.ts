import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChathubComponent } from './chathub.component';

describe('ChathubComponent', () => {
  let component: ChathubComponent;
  let fixture: ComponentFixture<ChathubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChathubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChathubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
