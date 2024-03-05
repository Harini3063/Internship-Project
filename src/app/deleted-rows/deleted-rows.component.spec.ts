/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeletedRowsComponent } from './deleted-rows.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('DeletedRowsComponent', () => {
  let component: DeletedRowsComponent;
  let fixture: ComponentFixture<DeletedRowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,AgGridAngular,ToastModule,ConfirmDialogModule],
      declarations: [ DeletedRowsComponent ],
      providers:[ConfirmationService,MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
