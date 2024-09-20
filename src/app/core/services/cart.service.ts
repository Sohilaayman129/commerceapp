
import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private _HttpClient:HttpClient){
          effect( ()=>{
            localStorage.setItem('cartnum',this.cartNumber().toString())
          })
  }

   
cartNumber:WritableSignal<number>=signal(0)

addproducttocart(id:string):Observable<any>
{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
    {
      "productId":id
    }
   )
}

GetLoggedusercart():Observable<any>
{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`)
}

RemovespecificcartItem(id:string):Observable<any>
{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`
  )
}

Updatecartproductquantity(id:string ,newcount:number ):Observable<any>
{
return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
  {
    "count": newcount
}
)
}

Clearusercart():Observable<any>
{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
}

}