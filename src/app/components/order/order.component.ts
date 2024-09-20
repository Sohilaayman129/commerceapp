import { Component, inject, Inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/ordercheck.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule , TranslateModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  private readonly _FormBuilder=inject(FormBuilder)
  
  private readonly _ActivatedRoute=inject(ActivatedRoute)
private readonly _OrderService=inject(OrderService)

orders:FormGroup=this._FormBuilder.group({

    details:[null,[Validators.required]],
    phone:[null,[Validators.required ,Validators.pattern(/01[0125][0-9]{8,}$/ )]],
    city:[null , [Validators.required]]

  });

cartId:WritableSignal<string|null>=signal(" ") ;

ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
  next:(params)=>{
  this.cartId.set(params.get('id'))
  console.log(this.cartId() )   //id
  }

})
}

ordersub !:Subscription 
IsLoading:WritableSignal<boolean>=signal(false)
orderSubmit():void{ 
 this.IsLoading.set(true)
console.log(this.orders.value) ; //{detailes,phone,city }
if(this.orders.valid){
this.ordersub=  this._OrderService.CheckOut(this.cartId() ,this.orders.value).subscribe({
  next:(res)=>{
console.log(res)
this.IsLoading.set(false)

if(res.status== 'success'){
window.open(res.session.url ,'_self')

}

  }

})
}
else{
  this.orders.setErrors({mismatch:true})
  this.orders.markAllAsTouched()

 }

}




ngOnDestroy(): void {
 this.ordersub?.unsubscribe()
}


}
