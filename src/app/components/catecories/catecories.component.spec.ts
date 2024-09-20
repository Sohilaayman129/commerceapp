import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatecoriesComponent } from './catecories.component';

describe('CatecoriesComponent', () => {
  let component: CatecoriesComponent;
  let fixture: ComponentFixture<CatecoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatecoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatecoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
