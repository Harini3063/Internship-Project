import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TableDataService } from '../table-data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  employeeData: any = {};
  cityOptions: string[] = ["Chennai", "Mumbai", "Hyderabad", "Trivandrum"];

  constructor(private tableDataService: TableDataService,private messageService:MessageService) {}

  updateEmployee(employeeForm: NgForm): void {
    console.log(this.employeeData);
    console.log(this.employeeData.id);
    this.tableDataService.updateEmployee(this.employeeData.id,this.employeeData)
      .subscribe(
        response => {
          console.log('Employee updated successfully:', response);
          // Optionally, reset the form after successful update
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Employee ${this.employeeData.id} added successfully` });
          employeeForm.resetForm();
          // Reset the employeeData object to clear the form fields
          this.employeeData = {};
        },
        error => {
          console.error('Error updating employee:', error);
          this.messageService.add({ severity: 'Warn', summary: 'Failure', detail: `Error in employee Creation` });
        }
      );
  }
}
