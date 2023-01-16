import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { distinctUntilChanged, from, map, Observable } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/material.module';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  const drawerSpy = jasmine.createSpyObj("MatSidenav", [
    "close", "open"
  ]);
  let mockObj = { matchStr: '(max-width: 800px)', result: false }
  const fakeObserve = (): Observable<BreakpointState> =>
    from([mockObj]).pipe(
      distinctUntilChanged(),
      map(match => ({ matches: match.result, breakpoints: {} }))
    );
  const bpSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);
  bpSpy.observe.and.callFake(fakeObserve);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [MaterialModule, BrowserAnimationsModule, AppRoutingModule],
      providers: [{ provide: BreakpointObserver, useValue: bpSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    component.drawer = drawerSpy
    mockObj = { matchStr: '(max-width: 800px)', result: false }
    component.ngAfterViewInit()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the sidebar', () => {
    const query = '(max-width: 800px)';
    bpSpy.observe(query).subscribe(async (state: BreakpointState) => {
      await fixture.whenStable()
      expect(drawerSpy.open).toHaveBeenCalled()
      expect(drawerSpy.mode).toEqual("side")
    });
  });

  it('should close the sidebar', () => {
    const query = '(max-width: 800px)';
    mockObj = { matchStr: '(max-width: 800px)', result: true }
    component.ngAfterViewInit()
    bpSpy.observe(query).subscribe(async (state: BreakpointState) => {
      await fixture.whenStable()
      expect(drawerSpy.close).toHaveBeenCalled()
      expect(drawerSpy.mode).toEqual("over")
    });
  });
});
