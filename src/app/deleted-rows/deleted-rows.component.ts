import { Component, OnInit } from '@angular/core';
import { Employee } from './../grid/grid.model';
import { ColDef, GridApi } from 'ag-grid-community';
import { TableDataService } from '../table-data.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-deleted-rows',
  templateUrl: './deleted-rows.component.html',
  styleUrls: ['./deleted-rows.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DeletedRowsComponent implements OnInit {
  deletedRows: Employee[] = [];
  gridApi!: GridApi;

  constructor(
    private tableDataService: TableDataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

    this.loadTableData();
    // this.route.queryParams.subscribe((delRows) => {
    //   const data = delRows['data'];
    //   if (data) {
    //     this.deletedRows = JSON.parse(data);
    //     console.log(this.deletedRows);
    //   }
    // });
  }

  loadTableData():void{
    this.tableDataService.GetAllEmployees().subscribe(employee =>
      {this.deletedRows= employee.filter(employee=>employee.isDeleted);
       console.log("Filtered the data");}

       ,
        error => console.error('Error loading employees:', error));
  }



  columnDefs: ColDef[] = [
    { checkboxSelection: true ,width:40,maxWidth:50},
    { headerName: 'ID', field: 'id', width:60,maxWidth:70},
    { headerName: 'Name', field: 'name' ,width:40,maxWidth:100  },
    { headerName: 'Department', field: 'department' ,width:90,maxWidth:150 },
    { headerName: 'Position', field: 'position',width: 60,maxWidth:150},
    { headerName: 'Email', field: 'email'},
    { headerName: 'Phone Number', field: 'phoneNumber',maxWidth:90 ,sortable:false},
    { headerName: 'Location', field: 'location',maxWidth:90}
  ];

  onGridReady(params: any): void {
    this.gridApi = params.api;
  }

  hardDelete(): void {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select the record to delete.' });
      return;
    }

    const selectedEmployee = selectedNodes[0].data as Employee;
    this.tableDataService.DeleteEmployee(selectedEmployee.id).subscribe(
      () => {
        console.log("Employee deleted permanently");
        this.loadTableData();
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record is Deleted successfully' });
      },
      error => {
        console.log("Error deleting employee", error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete record' });
      }
    );
  }




  confirmDelete(event: Event) {
    const SelectedNodes=this.gridApi.getSelectedNodes();
    if (SelectedNodes.length==0)
    {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select the record to delete.' });
      return;
    }

    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
            this.hardDelete();

        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
    });
  }

  confirmRestore(event:Event){
    const selectedNodes=this.gridApi.getSelectedNodes();
    if (selectedNodes.length==0)
    {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select the record to restore.' });
      return;
    }
    const selectedEmployee = selectedNodes[0].data as Employee;
    selectedEmployee.isDeleted=false;
    this.tableDataService.updateEmployee(selectedEmployee.id,selectedEmployee).subscribe(
      () => {
        console.log("Employee record updated");
        this.loadTableData();
        this.messageService.add({ severity: 'Success', summary: 'Success', detail: 'Record is restored successfully' });
      },
      error => {
        console.log("Error updating employee", error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to restore record' });
      }
    );

  }


}
