import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerScreenComponent } from './peer-screen.component';

describe('PeerScreenComponent', () => {
  let component: PeerScreenComponent;
  let fixture: ComponentFixture<PeerScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeerScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
