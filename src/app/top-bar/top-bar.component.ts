

import { Component, EventEmitter ,Output} from '@angular/core';

import { AddpannelService } from '../addpannel.service';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class topBarComponent
 {
  @Output() addbtn=new EventEmitter<void>;

  SidebarShow=true;

  showInputBar: boolean=false;


  toggleSearch()
  {
    this.showInputBar=!this.showInputBar;
  }


  constructor(private addPannelService:AddpannelService){}

  OpenAddPannel()
  {
    console.log("open");
    this.addPannelService.toggleAddPannel();
      // this.addbtn.emit()
  }




}
