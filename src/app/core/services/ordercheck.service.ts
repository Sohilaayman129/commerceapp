import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

constructor(private  _HttpClient:HttpClient) { }



CheckOut(cartId:string |null ,shippingAddress:object ):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.urlServer}`,
    {
      "shippingAddress":shippingAddress
  })
}

allorders():Observable<any>
{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/`)
}


userOrders(id:string):Observable<any>
{
return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
}   




}



