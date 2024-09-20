import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,NgClass , RouterLink,TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  private readonly _AuthService = inject(AuthService)

  private readonly _FormBuilder=inject(FormBuilder)
 
  private readonly _Router=inject(Router)
 


loginform:FormGroup=this._FormBuilder.group({
email:[null, [Validators.required,Validators.email]],
password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/ )] ],

}  );
   
loginsub !:Subscription
   MsgError:WritableSignal<string>=signal("")
   IsLoading:WritableSignal<boolean>=signal(false)
   MsgSuccess:WritableSignal<boolean>=signal(false)
Loginsubmit():void{

  this.IsLoading.set(true)
  if(this.loginform.valid){
 this.loginsub= this._AuthService.setloginform(this.loginform.value).subscribe({
        next:(res)=>{
          console.log(res)
         this.IsLoading.set(false)

         if(res.message=='success'){
        this.MsgSuccess.set(true)
        setTimeout(() => {
          //1- save token
          localStorage.setItem('userToken',res.token )
          //2- token decode
      this._AuthService.userData()
          //3-navigate home
          this._Router.navigate(['/home'])
        },1000);
         

         }
        },
        error:(err:HttpErrorResponse)=>{
      this.MsgError.set(err.error.message)
this.IsLoading.set(false)
        }

      } )
  
  }
 else{
  this.loginform.setErrors({mismatch:true})
  this.loginform.markAllAsTouched()
  this.IsLoading.set(false)
 }
}

ngOnDestroy(): void {
 
  this.loginsub?.unsubscribe()
}



}
