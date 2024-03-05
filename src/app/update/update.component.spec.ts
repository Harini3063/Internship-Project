/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { TableDataService } from '../table-data.service';
import { MessageService } from 'primeng/api';
import { UpdateComponent } from './update.component';
import { Employee } from '../grid/grid.model';
import { of, throwError } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;
  let tableDataServiceSpy:jasmine.SpyObj<TableDataService>;
  let messageServiceSpy:jasmine.SpyObj<MessageService>;

  beforeEach(async(() => {
    const tableDataServiceSpyObj=jasmine.createSpyObj('TableDataService',['updateEmployee']);
    const messageServiceSpyObj=jasmine.createSpyObj('MessageService',['add']);
    TestBed.configureTestingModule({
      imports:[FormsModule,ButtonModule,DropdownModule],
      declarations: [ UpdateComponent ],
      providers:[
        {provide:TableDataService,useValue:tableDataServiceSpyObj},
        {provide:MessageService,useValue:messageServiceSpyObj}
      ]
    })
    .compileComponents();
    tableDataServiceSpy=TestBed.inject(TableDataService) as jasmine.SpyObj<TableDataService>;
    messageServiceSpy=TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the data and reset the form',()=>
  {
    const form: NgForm = {
      resetForm: jasmine.createSpy('resetForm')
    } as unknown as NgForm;
    const employeeData:Employee={
    id:1,
    name: "Jane",
    department: "Engineering",
    position: "Software Engineer",
    email: "jane.smith@example.com",
    phoneNumber: "+1987654321",
    location: "Chennai"};

    const response:Employee[]=[];

    tableDataServiceSpy.updateEmployee.and.returnValue(of(response));

    component.employeeData=employeeData;
    component.updateEmployee(form);

    expect(tableDataServiceSpy.updateEmployee).toHaveBeenCalledWith(employeeData.id,employeeData);
    expect(messageServiceSpy.add).toHaveBeenCalledWith({ severity: 'success', summary: 'Success', detail: `Employee ${employeeData.id} added successfully` });
    expect(form.resetForm).toHaveBeenCalled();
    expect(component.employeeData).toEqual({});

  });

  it('should handle error during form submission',()=>
  {
    const form: NgForm = {
      resetForm: jasmine.createSpy('resetForm')
    } as unknown as NgForm;
    const employeeData={
    id:2,
    name: "Jane",
    department: "Engineering",
    position: "Software Engineer",
    email: "jane.smith@example.com",
    phoneNumber: "+1987654321",
    location: "Chennai"};
    const error=new Error("Test Error")

    tableDataServiceSpy.updateEmployee.and.returnValue(throwError(error));

    component.employeeData=employeeData;
    component.updateEmployee(form);

    expect(tableDataServiceSpy.updateEmployee).toHaveBeenCalledWith(employeeData.id,employeeData);
    expect(messageServiceSpy.add).toHaveBeenCalledWith({ severity: 'Warn', summary: 'Failure', detail: `Error in employee Creation` });
    expect(form.resetForm).not.toHaveBeenCalled();
    expect(component.employeeData).toEqual(employeeData);
  });
});
