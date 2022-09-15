import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent implements OnInit {
  resetToken: null;
  ResetForm: FormGroup;
  submitted = false;
  fieldTextType: boolean;
    fieldTextType2: boolean;
  constructor( private route: ActivatedRoute,private formBuilder: FormBuilder,private userService: UserService,private spinner2: NgxSpinnerService,private router: Router) { 
    this.route.params.subscribe(params => {
    this.resetToken = params.token;
    console.log(this.resetToken);
    
  });}

  ngOnInit(): void {
    this.ResetForm = this.formBuilder.group({
    
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
      
     
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
  get f() { return this.ResetForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ResetForm.invalid) {
      alert('Failed!! :-)\n\n');
        return;
    }
    const formData = new FormData();
    formData.append('Email',   this.resetToken);
    formData.append('Pwd', this.ResetForm.value.password);
    this.userService.Resetpassword(formData).subscribe((response) => {
      if (response){
        console.log(response.message);
        console.log(response.message);
        if(response.message=='user is updated'){
          
          Swal.fire({
            title: 'password updated',
            icon:'success',
            timer:2000,
            showConfirmButton:false,
            width: '500px',
            
          
          });
          this.router.navigate(['auth/login']);
        }
        if(response.message=='user not saved'){
        

          Swal.fire({
            title: 'password updat failed',
            icon:'error',
            timer:2000,
            showConfirmButton:false,
            width: '500px',
            
          
          }
          
          );
          this.router.navigate(['auth/login']);
          
          
        }
        
          
         
          this.ResetForm.reset();
          
        }
        
        
      
    });
   
      }

  }

