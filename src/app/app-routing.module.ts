import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { ScanComponent } from './scan/scan.component';
import { AddComponent } from './add/add.component';
import { DeletedRowsComponent } from './deleted-rows/deleted-rows.component';
import { UpdateComponent } from './update/update.component';
const routes: Routes = [
  {path:'',component:ScanComponent},
  {path:'list-employee',component:GridComponent},
  {path:'deletion',component:DeletedRowsComponent},
  {path:'update',component:UpdateComponent},
  {path:'**',component:GridComponent}
   ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule
 {

 }

