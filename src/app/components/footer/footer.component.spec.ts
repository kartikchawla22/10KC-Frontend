import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should show brand name and copyright text", () => {
    expect(fixture.debugElement.nativeElement.querySelector(".brand p").innerHTML).toContain("10 Thousand Coffees")
    expect(fixture.debugElement.nativeElement.querySelector(".footer_container > p").innerHTML).toContain("Kartik Chawla © 2023 All Rights Reserved.")
  })
});
