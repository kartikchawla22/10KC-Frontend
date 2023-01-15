import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  constructor(private _breakpointObserver$: BreakpointObserver) { }
  ngAfterViewInit(): void {
    this._breakpointObserver$.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.drawer.mode = 'over';
        this.drawer.close();
      } else {
        this.drawer.mode = 'side';
        this.drawer.open();
      }
    });
  }
}