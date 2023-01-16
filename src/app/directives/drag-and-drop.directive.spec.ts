import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DragAndDropDirective } from './drag-and-drop.directive';

describe('DragAndDropDirective', () => {
  let component: TestDnDComponent;
  let fixture: ComponentFixture<TestDnDComponent>;
  let directiveEl: DebugElement;
  let directive: DragAndDropDirective
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDnDComponent, DragAndDropDirective]
    });
    fixture = TestBed.createComponent(TestDnDComponent); (2)
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(DragAndDropDirective));
    directive = directiveEl.injector.get(DragAndDropDirective) as DragAndDropDirective;
    fixture.detectChanges();
  });
  it('should create an instance', () => {
    const directive = new DragAndDropDirective();
    expect(directive).toBeTruthy();
  });

  it('should add class on onDragOver', () => {
    directiveEl.triggerEventHandler('dragover', new Event("dragover"))
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.fileover'))).toBeTruthy();
  });

  it('should remove class on dragleave', () => {
    directiveEl.triggerEventHandler('dragleave', new Event("dragleave"))
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.fileover'))).toBeFalsy();
  });

  it('should remove class on drop', () => {
    directiveEl.triggerEventHandler('drop', new DragEvent('drop'))
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.fileover'))).toBeFalsy();
  });

  it('should emit event on file drop', () => {
    const spy = spyOn(directive.fileDropped, 'emit');
    const file = new File([''], 'dummy.jpg');
    const fileDropEvent = { stopPropagation: () => { }, preventDefault: () => { }, dataTransfer: { files: [file, file, file] } };

    directiveEl.triggerEventHandler('drop', fileDropEvent)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});

@Component({
  template: `<div appDragAndDrop></div>`
})
class TestDnDComponent {
}