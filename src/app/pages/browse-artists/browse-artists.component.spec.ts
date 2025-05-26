import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseArtistsComponent } from './browse-artists.component';

describe('BrowseArtistsComponent', () => {
  let component: BrowseArtistsComponent;
  let fixture: ComponentFixture<BrowseArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseArtistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
