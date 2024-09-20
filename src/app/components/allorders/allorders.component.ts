import { Component, inject, isStandalone, OnInit, OnDestroy, WritableSignal, signal } from '@angular/core';
import { OrderService } from '../../core/services/ordercheck.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { subscribeOn, Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-allorders',
  standalone:true,
  imports: [CurrencyPipe,DatePipe , TranslateModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit , OnDestroy {
private readonly _OrderService=inject(OrderService)

 
dataorders:WritableSignal<any>=signal([])

hamada:WritableSignal<any>=signal(null )
allordersub! : Subscription
ngOnInit(): void {
 this.hamada.set( jwtDecode(  localStorage.getItem('userToken')!)   )
console.log(this.hamada().id) 
 this.allordersub=this._OrderService.userOrders(this.hamada().id).subscribe({
       next:(res)=>{
        console.log(res)
       this.dataorders.set(res)

       }
   
    })
}

ngOnDestroy(): void {
    this.allordersub.unsubscribe()
}
















}
