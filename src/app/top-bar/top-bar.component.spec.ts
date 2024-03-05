import { ComponentFixture, TestBed } from '@angular/core/testing';

import {topBarComponent } from './top-bar.component';
import { ButtonModule } from 'primeng/button';
import { AddComponent } from '../add/add.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

describe('   topBarComponent', () => {
  let component:    topBarComponent;
  let fixture: ComponentFixture<   topBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ButtonModule,HttpClientModule,SidebarModule,FormsModule,DropdownModule],
      declarations: [  topBarComponent,AddComponent],
      providers:[MessageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(  topBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
