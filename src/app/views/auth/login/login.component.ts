import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginAuthService } from "src/app/service/login-auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from "@angular/common/http";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  fieldTextType: boolean;
  LoginForm: FormGroup;
    submitted = false;
  constructor( private router: Router, private authService: LoginAuthService,private formBuilder: FormBuilder) {
    this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
    
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
     
  });
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  get f() { return this.LoginForm.controls; }
  onSubmit() {
    this.submitted = true;

    
    if (this.LoginForm.invalid) {
        return;
    }
    this.user.password=this.LoginForm.value.password;
    this.user.email=this.LoginForm.value.email;
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.LoginForm.value, null, 4));
    this.authService.loginUser(this.user).subscribe((response) => {

      if (response.token){
        
        localStorage.setItem('currentUser', JSON.stringify(response));
        if (response.user.role === 'ADMIN'){
          this.router.navigate(['admin/dashboard']);
        }else {
          this.router.navigate(['user/tables']);
        }

      }
    },
    (err:HttpErrorResponse)=>{ 
    Swal.fire({
      title: err.error.message,
      icon:'error',
      timer:2000,
      showConfirmButton:false,
      width: '500px',
      
    
    });
  }
    
    )
    ;
}

}
