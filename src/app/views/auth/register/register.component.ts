import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginAuthService } from "src/app/service/login-auth.service";
import { UserService } from "src/app/service/user.service";
import { MustMatch } from './must-match.validator';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import {NgxCaptchaService} from  '@binssoft/ngx-captcha'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  captchaStatus:any = null;
  captchaConfig:any = {
     length:6,
     type:2,
     cssClass:'custom',
     back: {
       stroke:"#2F9688",
       solid:"#f2efd2"
     } ,
     font:{
      color:"#000000",
      size:"35px"
     }
   };
  registerForm: FormGroup;
    submitted = false;
    fieldTextType: boolean;
    fieldTextType2: boolean;
    selectedFiles: FileList;
    file:File;
    allowedExtensions = ['png', 'jpg'];
  constructor(private userService: UserService , private authService: LoginAuthService ,private formBuilder:FormBuilder, private router: Router,private captchaService:NgxCaptchaService) {
    this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    
    this.registerForm = this.formBuilder.group({
     
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      file: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }
  onFileSelected(event) {

  this.file = event.target.files[0];

    if (this.file) {

       console.log(this.file.name);

       

        
    }}
 
  get f() { return this.registerForm.controls; }

  onSubmit() {
    
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
        alert('Failed!! :-)\n\n');
          return;
      }

      // display form values on success
      const formData = new FormData();
      formData.append('Email',   this.registerForm.value.email);
      formData.append('Pwd', this.registerForm.value.password);
      formData.append('FirstName', this.registerForm.value.firstName);
      formData.append('LastName',this.registerForm.value.lastName);
      formData.append('Phone',this.registerForm.value.phonenumber);
      //console.log("test=="+user.file.name);
      console.log("test=="+this.registerForm.value.phonenumber);
      formData.append('file', this.file);
  this.userService.saveUser(formData).subscribe((response) => {
    if (response){
      console.log(response.message);
      if(response.message=='email exist'){
        Swal.fire({
          title: 'user already exists with this email',
          icon:'error',
          timer:2000,
          showConfirmButton:false,
          width: '500px',
          
        
        });
      }
      if(response.message=='user is saved'){
        Swal.fire({
          title: 'user saved',
          icon:'success',
          timer:2000,
          showConfirmButton:false,
          width: '500px',
          
        
        });
        this.registerForm.reset();
        this.router.navigate(['/auth/login']);
      }
      
      
    }
  });
    
   
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
      this.router.navigate(['/auth/login']);

  }
  

}
