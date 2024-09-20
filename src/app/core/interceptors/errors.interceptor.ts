import { TranslateModule } from '@ngx-translate/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

import Swal from 'sweetalert2';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {


  return next(req).pipe(  catchError((err)=>{
         console.log( 'interceptor'  , err.error.message) 


         Swal.fire({
          title:'Error!',
          text: err.error.message ,
          icon: 'error',
          confirmButtonText: 'OK'
        })

   
    
           

    return throwError(()=> err)
  }))    ;
};
