import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerMediaComponent } from './peer-media.component';

describe('PeerMediaComponent', () => {
  let component: PeerMediaComponent;
  let fixture: ComponentFixture<PeerMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeerMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
