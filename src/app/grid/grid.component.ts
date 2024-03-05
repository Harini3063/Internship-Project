import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef,ITextFilterParams,GridApi } from 'ag-grid-community';
import { TableDataService } from '../table-data.service';
import { Employee } from './grid.model';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit
{

  rowData:Employee[]=[];
  gridApi!: GridApi;
  deletedRows:Employee[]=[];

  constructor(private tableDataService:TableDataService,private route:Router) {}

  columnDefs: ColDef[] = [
    { checkboxSelection: true ,pinned:'left',lockPinned:true,maxWidth:40},
    { headerName: 'ID', field: 'id'},
    { headerName: 'Name', field: 'name' ,filter:"agTextColumnFilter",
    filterParams: {
      buttons: ['reset', 'apply'],
    } as ITextFilterParams, },
    { headerName: 'Department', field: 'department' ,maxWidth:100 ,filter:"agTextColumnFilter",
    filterParams: {
      buttons: ['reset', 'apply'],
    } as ITextFilterParams,},
    { headerName: 'Position', field: 'position',maxWidth:100,filter:"agTextColumnFilter",
    filterParams: {
      buttons: ['reset', 'apply'],
    } as ITextFilterParams, },
    { headerName: 'Email', field: 'email'},
    { headerName: 'Phone Number', field: 'phoneNumber',maxWidth:100 ,sortable:false},
    { headerName: 'Location', field: 'location',maxWidth:100,filter:"agTextColumnFilter",
    filterParams: {
      buttons: ['reset', 'apply'],
    } as ITextFilterParams,}
  ];

  ngOnInit() :void {
    this.loadTableData();
  }

  loadTableData():void {
    this.tableDataService.GetAllEmployees().subscribe(employee =>
      {this.rowData= employee.filter(employee=>!employee.isDeleted);
       console.log("Filtered the data");
       console.log("data is received")}
       ,
        error => console.error('Error loading employees:', error));
  }

  onGridReady(params:any):void{
    this.gridApi=params.api
  }

  SoftDelete():void{

    const selectedNodes =this.gridApi.getSelectedNodes()
    const selectedRows = selectedNodes.map((node: { data: any; }) => node.data);
    if (selectedRows.length==0)
    {
      alert("Please select the rows for deletion")
    }

    this.deletedRows=selectedRows;

    selectedRows.forEach(row => {
      row.isDeleted=true;
    });

    this.tableDataService.UpdateEmployee(selectedRows).subscribe(
      response => {
        console.log('Rows soft deleted successfully:', response);
        console.log("selected rows",selectedRows);
        console.log("deleted rows",this.deletedRows)
        this.loadTableData(); },
      error => {
        console.error('Error soft deleting rows:', error);
      }
    );
  }
  ViewDeletedRows():void
  {
    this.route.navigate(["/deletion"]);

  }




}


