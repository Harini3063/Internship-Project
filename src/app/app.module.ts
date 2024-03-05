import { ConfirmationService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridAngular } from 'ag-grid-angular';
import {topBarComponent } from './top-bar/top-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {SidebarModule} from "primeng/sidebar";
import { GridComponent } from './grid/grid.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { ScanComponent } from './scan/scan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeletedRowsComponent } from './deleted-rows/deleted-rows.component';
import { UpdateComponent } from './update/update.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
    topBarComponent,
    SidebarComponent,
    GridComponent,
    AddComponent,
    ScanComponent,
      DeletedRowsComponent,
      UpdateComponent,

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    ButtonModule,
    AgGridAngular,
    HttpClientModule,
    FormsModule,
    ZXingScannerModule,
    DropdownModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule
  ],
providers: [
  ConfirmationService,
  MessageService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
