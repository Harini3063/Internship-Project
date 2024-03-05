import { Employee } from './grid/grid.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  constructor(public http:HttpClient) {}

  private APIurl="https://localhost:7295/api/Employee";

  httpOptions={
    headers:new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }

  GetAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.APIurl}`);
  }
  getEmployeeById(id:number): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.APIurl}/${id}`);
  }

  UpdateEmployee(employees : Employee[]):Observable<Employee[]>
  {
    return this.http.put<Employee[]>(`${this.APIurl}`,employees);
  }

  DeleteEmployee(id:number):Observable<Employee[]>
  {
      return this.http.delete<Employee[]>(`${this.APIurl}/${id}`);
  }
  postEmployee(employeeData: any):Observable<Employee[]>
  {
    return this.http.post<Employee[]>(`${this.APIurl}`,employeeData);
  }
  updateEmployee( id:number,employeeData: any):Observable<Employee[]>
  {
    return this.http.put<Employee[]>(`${this.APIurl}/${id}`,employeeData);
  }
}
