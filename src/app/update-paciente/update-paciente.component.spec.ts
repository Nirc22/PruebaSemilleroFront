import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePacienteComponent } from './update-paciente.component';

describe('UpdatePacienteComponent', () => {
  let component: UpdatePacienteComponent;
  let fixture: ComponentFixture<UpdatePacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
