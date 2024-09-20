
import { NgClass } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forgerpassword',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass,TranslateModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgerpasswordComponent {
  private readonly _FormBuilder=inject(FormBuilder)
private readonly _AuthService=inject(AuthService)
private readonly _Router=inject(Router)
      step:WritableSignal<number>=signal(1)
  verifyemail:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]]
  })
  
  verifycode:FormGroup=this._FormBuilder.group({
    resetCode :[null,[Validators.required,Validators.pattern(/^\w{6,}$/ )]]
  })
  
      
  resetpassword:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    newPassword:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)] ],

  })
  IsLoading:WritableSignal<boolean>=signal(false)

verifyemailsubmit():void{
  this.IsLoading.set(true)
 let emailvalu= this.verifyemail.get('email')?.value
 this.resetpassword.get('email')?.patchValue(emailvalu)
this._AuthService.setverifyemail(this.verifyemail.value).subscribe({
  next:(res)=>{
console.log(res)
this.IsLoading.set(false)
if(res.statusMsg=='success'){
this.step.set(2);

}
  }

})
}

verifycodesubmit():void{
  this.IsLoading.set(true) 
  this._AuthService.setverifycode(this.verifycode.value).subscribe({
    next:(res)=>{
      console.log(res)
      this.IsLoading.set(false)
      if(res.status=='Success'){
    
        this.step.set(3);

      }
    }

  })
}
  
  
resetpasswordsubmit():void{
  this.IsLoading.set(true)
  this._AuthService.resetpassword(this.resetpassword.value).subscribe({
    next:(res)=>{
      console.log(res)
      this.IsLoading.set(false)
        localStorage.setItem('userToken',res.token)
        this._AuthService.userData()
        
        this._Router.navigate(['/home'])
    }

  })
}
  
  

}
