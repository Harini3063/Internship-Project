import { Component } from '@angular/core';
import { AddpannelService } from '../addpannel.service';
import { sidebarItems } from './sidebar.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebarShow:boolean=true;


  constructor(private addPannelService:AddpannelService){}

  callMethod(item: any): void {
    if (item.clickFunction) {
      item.clickFunction();
    }
  }


  OpenAddPannel()
  {
    this.addPannelService.toggleAddPannel();
  }

  sidebarVisible()
  {
      this.sidebarShow=!this.sidebarShow;
  }


  sidebarItems = [
    { iconClass: 'pi pi-home font-semibold text-base px-2', label: 'Home', routerLink: '/' },
    { iconClass: 'pi pi-search font-semibold text-base px-2', label: 'Search', routerLink: '/list-employee' },

    { iconClass: 'pi pi-file-edit font-semibold text-base px-2', label: 'Update', routerLink: '/update' }
  ]

  // { iconClass: 'pi pi-plus font-semibold text-base px-2', label: 'Add ', clickFunction: this.OpenAddPannel, routerLink: '/create-employee' },

}
