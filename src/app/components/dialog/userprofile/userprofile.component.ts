import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginAuthService } from 'src/app/service/login-auth.service';
import { UserService } from 'src/app/service/user.service';
import { MustMatch } from '../must-match.validator';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  
})
export class UserprofileComponent implements OnInit {
  registerForm: FormGroup;
  public user: any = {};
  public updateduser: any = {};
  submitted = false;
  public loginuser: any = {};
  
  fieldTextType: boolean;
  fieldTextType2: boolean;
  parsedJson: any; 
  constructor(private formBuilder:FormBuilder,private userService: UserService , private authService: LoginAuthService ,private dialogRef: MatDialogRef<UserprofileComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void {
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.user=this.loginuser.user;
    console.log(this.loginuser);
    console.log(this.user.firstName);
    this.registerForm = this.formBuilder.group({
     
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phonenumber: [12345645, [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
      
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  get f() { return this.registerForm.controls; }
  close() {
  
    this.dialogRef.close();
}
toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}
toggleFieldTextType2() {
  this.fieldTextType2 = !this.fieldTextType2;
}
onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
  
      return;
  }
  const formData = new FormData();
  formData.append('Email',   this.registerForm.value.email);
  formData.append('Pwd', this.registerForm.value.password);
  formData.append('FirstName', this.registerForm.value.firstName);
  formData.append('LastName',this.registerForm.value.lastName);

  formData.append('Phone',this.registerForm.value.phonenumber);
  formData.append('id',this.user.id);
console.log("aaa123"+this.registerForm.value.phonenumber);
this.userService.UpdateUser(formData).subscribe((response) => {
  if (response){
    console.log(response.message);
    if(response.message=='user not saved'){
      Swal.fire({
        title: 'user already exists with this email',
        icon:'error',
        timer:2000,
        showConfirmButton:false,
        width: '500px',
        
      
      });
    }
    if(response.message=='user is updated'){
      const formData = new FormData();
      formData.append('id',   this.user.id);
        console.log('sssss'+this.user.id);
        this.updateduser=this.userService.getUpdatedUser(formData).subscribe((response)  => {
          console.log(response);
          this.loginuser.user=response;
          localStorage.setItem('currentUser', JSON.stringify(this.loginuser));
          
        
        });
        
      Swal.fire({
        title: 'user saved',
        icon:'success',
        timer:2000,
        showConfirmButton:false,
        width: '500px',
        
      
      });
      this.registerForm.reset();
      this.dialogRef.close();
    }
    
    
  }
});
}
}
