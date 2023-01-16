import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/material.module';

import { ConfirmationDialogueComponent } from './confirmation-dialogue.component';

describe('ConfirmationDialogueComponent', () => {
  let component: ConfirmationDialogueComponent;
  let fixture: ComponentFixture<ConfirmationDialogueComponent>;
  const matDialogRefSpy = jasmine.createSpyObj("MatDialogRef", ["close"])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogueComponent],
      imports: [MaterialModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: { imageId: 12 } },
      { provide: MatDialogRef, useValue: matDialogRefSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm', () => {
    component.onConfirm()
    expect(matDialogRefSpy.close).toHaveBeenCalledWith({ selection: true, imageId: 12 })
  })

  it('should cancel', () => {
    component.onDismiss()
    expect(matDialogRefSpy.close).toHaveBeenCalledWith({ selection: false, imageId: 0 })
  })
});
