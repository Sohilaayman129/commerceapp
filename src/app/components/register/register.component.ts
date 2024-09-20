import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule ,NgClass ,TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

private readonly _AuthService = inject(AuthService)

  private readonly _FormBuilder=inject(FormBuilder)
 
  private readonly _Router=inject(Router)
 
// dataform= { name:'Sohila Ayman Amer'}
// ngOnInit(): void {
//  this.registerform.patchValue({
//   name:this.dataform.name,
//  })
// }
registerform:FormGroup=this._FormBuilder.group({
name:[null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)] ],
email:[null, [Validators.required,Validators.email]],
password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/ )] ],
rePassword:[null,[]],
phone:[null ,[Validators.required,Validators.pattern(/^01[0125][0-9]{8,}$/)] ]
}, {validators: [this.confirmpassword]  }    );
  registersub !:Subscription
   MsgError:WritableSignal<string>=signal('')
   IsLoading:WritableSignal<boolean>=signal(false)
   MsgSuccess:WritableSignal<boolean>=signal(false)
registersubmit():void{
  this.IsLoading.set(true)
  if(this.registerform.valid){
 this.registersub= this._AuthService.setregisterform(this.registerform.value).subscribe({
        next:(res)=>{
          console.log(res)
         this.IsLoading.set(false)

         if(res.message=='success'){
        this.MsgSuccess.set(true)
        setTimeout(() => {
          this._Router.navigate(['/login'])
        },1000);
         

         }
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err.message)
      this.MsgError.set(err.error.message)
this.IsLoading.set(false)
        }

      } )
  
  }
 else{
  this.registerform.setErrors({mismatch:true})
  this.registerform.markAllAsTouched()
  this.IsLoading.set(false)
 }
}
ngOnDestroy(): void {
this.registersub ?.unsubscribe()
  
}
// custom validation ===>method fun take parametar    g:registerform

confirmpassword(g:AbstractControl){

if(g.get('password')?.value===g.get('rePassword')?.value)
  {
return null
 }
else
 {
  return {mismatch:true}
 }

}


}

