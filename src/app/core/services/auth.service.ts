import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

private readonly _HttpClient=inject(HttpClient)

private readonly _Router=inject(Router)

userToken:WritableSignal<any>=signal(null)
setregisterform(data:object):Observable<any>
{
return this._HttpClient.post( `${environment.baseUrl}/api/v1/auth/signup` , data )
}

setloginform(data:object):Observable<any>
{
return this._HttpClient.post( `${environment.baseUrl}/api/v1/auth/signin`, data )
}

userData():void{
 this.userToken.set(jwtDecode( localStorage.getItem('userToken') ! )) 
 console.log('userToken',this.userToken() )
}

logout():void{
  localStorage.removeItem('userToken')
  this.userToken.set(null)
this._Router.navigate(['/login'])

}


setverifyemail(data:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data)
}

setverifycode(data:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
}

resetpassword(data:object):Observable<any>
{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
}



}

