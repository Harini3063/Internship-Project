import { HttpClientModule } from '@angular/common/http';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TableDataService } from '../table-data.service';
import { AddpannelService } from '../addpannel.service';
import { MessageService } from 'primeng/api';
import { FormsModule, NgForm } from '@angular/forms';
import { AddComponent } from './add.component';
import { EventEmitter } from '@angular/core';
import { of, throwError, Subscription } from 'rxjs';
import { Employee } from '../grid/grid.model';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';


describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let tableDataServiceSpy:jasmine.SpyObj<TableDataService>;
  let addPannelService:AddpannelService;
  let messageServiceSpy:jasmine.SpyObj<MessageService>;

  beforeEach(async(() => {
    const tableDataServiceSpyObj=jasmine.createSpyObj('TableDataService',['postEmployee']);
    const messageServiceSpyObj=jasmine.createSpyObj('MessageService',['add']);
    addPannelService = {
      addPannelToggle: new EventEmitter()
    } as unknown as AddpannelService;


    TestBed.configureTestingModule({
      imports:[FormsModule,ButtonModule,DropdownModule,SidebarModule,HttpClientModule],
      declarations: [ AddComponent ],
      providers:[
        {provide:TableDataService,useValue:tableDataServiceSpyObj},
        {provide:AddpannelService,useValue:addPannelService},
        {provide:MessageService,useValue:messageServiceSpyObj},
        ]

    })
    .compileComponents();

    tableDataServiceSpy=TestBed.inject(TableDataService) as jasmine.SpyObj<TableDataService>;
    messageServiceSpy=TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should open the add pannel when triggered',()=>{
    addPannelService=TestBed.inject(AddpannelService);
    addPannelService.addPannelToggle.subscribe(()=>{
    component.addbarVisible=!component.addbarVisible;
    });
    addPannelService.addPannelToggle.emit();

    expect(component.addbarVisible).toBe(false);
  });


  it('should get the data and reset the form',()=>
  {
    const form: NgForm = {
      resetForm: jasmine.createSpy('resetForm')
    } as unknown as NgForm;
    const employeeData={name: "Jane",
    department: "Engineering",
    position: "Software Engineer",
    email: "jane.smith@example.com",
    phoneNumber: "+1987654321",
    location: "Chennai"};

    const response:Employee[]=[];

    tableDataServiceSpy.postEmployee.and.returnValue(of(response));

    component.employeeData=employeeData;
    component.submitForm(form);

    expect(tableDataServiceSpy.postEmployee).toHaveBeenCalledWith(employeeData);
    expect(messageServiceSpy.add).toHaveBeenCalledWith({ severity: 'success', summary: 'Success', detail: `Employee ${employeeData.name} added successfully` });
    expect(form.resetForm).toHaveBeenCalled();
    expect(component.employeeData).toEqual({});

  });
  it('should handle error during form submission',()=>
  {
    const form: NgForm = {
      resetForm: jasmine.createSpy('resetForm')
    } as unknown as NgForm;
    const employeeData={name: "Jane",
    department: "Engineering",
    position: "Software Engineer",
    email: "jane.smith@example.com",
    phoneNumber: "+1987654321",
    location: "Chennai"};
    const error=new Error("Test Error")

    tableDataServiceSpy.postEmployee.and.returnValue(throwError(error));

    component.employeeData=employeeData;
    component.submitForm(form);

    expect(tableDataServiceSpy.postEmployee).toHaveBeenCalledWith(employeeData);
    expect(messageServiceSpy.add).toHaveBeenCalledWith({ severity: 'Warn', summary: 'Failure', detail: `Error in employee Creation` });
    expect(form.resetForm).not.toHaveBeenCalled();
    expect(component.employeeData).toEqual(employeeData);
  });

  
});
