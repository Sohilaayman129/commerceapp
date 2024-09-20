import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor (private _HttpClient:HttpClient) { }
  
  getallcategories():Observable<any>
  {
return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }

  getspecificcategories(id:string):Observable<any>
  {
return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`)
  }
}
