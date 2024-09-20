import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(private _HttpClient:HttpClient) { }

wishNumber:WritableSignal<number>=signal(0)

Addproducttowishlist(id:string):Observable<any>
{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
    {
      "productId": id
  }
  )
}

Removeproductfromwishlist(id:string):Observable<any>
{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}` )
}

Getloggeduserwishlist():Observable<any>
{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
}


}
