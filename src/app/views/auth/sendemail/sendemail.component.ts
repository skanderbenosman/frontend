import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sendemail',
  templateUrl: './sendemail.component.html',
  styleUrls: ['./sendemail.component.css']
})
export class SendemailComponent implements OnInit {

  SendForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private userService: UserService,private spinner2: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SendForm = this.formBuilder.group({
    
      email: ['', [Validators.required, Validators.email]]
      
     
  });
  }
  get f() { return this.SendForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.SendForm.invalid) {
        return;
    }
    this.spinner2.show();
    const formData = new FormData();
    formData.append('email',   this.SendForm.value.email);
    this.userService.SendMail(formData).subscribe((response) => {
      if (response){
        console.log(response.message);
        if(response.message=='email sent'){
          this.spinner2.hide();
          Swal.fire({
            title: 'email sent',
            icon:'success',
            timer:2000,
            showConfirmButton:false,
            width: '500px',
            
          
          });
        }
        if(response.message=='email not found'){
          this.spinner2.hide();

          Swal.fire({
            title: 'user not found',
            icon:'error',
            timer:2000,
            showConfirmButton:false,
            width: '500px',
            
          
          }
          
          );
          this.SendForm.reset();
          
        }
        
        
      }
    },(error:HttpErrorResponse )=>{
      this.spinner2.hide();
     
      Swal.fire({
        title: 'email send fail',
        icon:'error',
        timer:2000,
        showConfirmButton:false,
        width: '500px',
        
      
      });
    });
   
      }

}
