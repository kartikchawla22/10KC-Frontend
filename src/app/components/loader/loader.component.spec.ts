import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderService } from 'src/app/services/loader/loader.service';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  const loaderServiceMock = jasmine.createSpyObj('LoaderService', ['showLoader', 'hideLoader']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [{ provide: LoaderService, useValue: loaderServiceMock }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the loader', () => {
    loaderServiceMock.showLoader()
    expect(fixture.debugElement.nativeElement.querySelector(".loader-container")).toBeDefined();
  });
  it('should hide the loader', () => {
    loaderServiceMock.hideLoader()
    expect(fixture.debugElement.nativeElement.querySelector(".loader-container")).toBeNull();
  });
});
