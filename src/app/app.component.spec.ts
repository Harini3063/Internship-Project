import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { topBarComponent } from './top-bar/top-bar.component';
import { ButtonModule } from 'primeng/button';
import { AddComponent } from './add/add.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { GridComponent } from './grid/grid.component';
import { DeletedRowsComponent } from './deleted-rows/deleted-rows.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AgGridAngular } from 'ag-grid-angular';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        CalendarModule,
        ConfirmDialogModule,
        ToastModule

      ],
      declarations: [
        AppComponent,
        SidebarComponent,
        topBarComponent,
        AddComponent,
        GridComponent,
        AddComponent,
        DeletedRowsComponent,

      ],
      providers:[MessageService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'barCodeProject'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('barCodeProject');
  });


});
