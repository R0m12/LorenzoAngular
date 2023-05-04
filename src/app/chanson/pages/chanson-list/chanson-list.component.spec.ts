import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChansonListComponent } from './chanson-list.component';

describe('ChansonListComponent', () => {
  let component: ChansonListComponent;
  let fixture: ComponentFixture<ChansonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChansonListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChansonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
