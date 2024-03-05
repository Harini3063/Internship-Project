import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TableDataService } from '../table-data.service';
import { AddpannelService } from '../addpannel.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnDestroy {
  private subscription:Subscription;
  addbarVisible: boolean = false;
  employeeData:any={};
  cityOptions: string[] = ["Chennai", "Mumbai", "Hyderabad", "Trivandrum"];

  constructor(private addPannelService:AddpannelService,private tableDataService:TableDataService,private messageService:MessageService)
  {
    this.subscription=this.addPannelService.addPannelToggle.subscribe(() =>{
    this.addbarVisible=!this.addbarVisible;
    })
  }

  submitForm(form:NgForm): void
  {
      console.log(this.employeeData);
      this.tableDataService.postEmployee(this.employeeData)
        .subscribe(
          response => {
            console.log('Employee added successfully:', response);
            form.resetForm();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `Employee added successfully` });

            this.employeeData = {};
          },
          error => {
            console.error('Error adding employee:', error);
            this.messageService.add({ severity: 'Warn', summary: 'Failure', detail: `Error in employee Creation` });
          }
        );
    }

    ngOnDestroy(): void {
      if(this.subscription){
      this.subscription.unsubscribe();
      }
    }
  }


