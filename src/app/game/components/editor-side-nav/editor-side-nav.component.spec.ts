import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorSideNavComponent } from './editor-side-nav.component';

describe('EditorSideNavComponent', () => {
  let component: EditorSideNavComponent;
  let fixture: ComponentFixture<EditorSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
