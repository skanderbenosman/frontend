import { HttpEventType, HttpProgressEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UploadFilesService } from 'src/app/service/upload-files.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addfile',
  templateUrl: './addfile.component.html',
  
})
export class AddfileComponent implements OnInit {
  file:File;
  form: FormGroup;
  registerForm: FormGroup;
  submitted = false;
  constructor(public formBuilder:FormBuilder,public imageUploadService: UploadFilesService,private router: Router,private spinner: NgxSpinnerService,private dialogRef: MatDialogRef<AddfileComponent>) {
    
   }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
     
      algo: ['', Validators.required],
      file: ['', Validators.required]
      
  });
  }
  uploadFile(event:any) {
    const file = event.target.files ? event.target.files[0] : '';
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar')?.updateValueAndValidity()
  }
  onFileSelected(event) {

    this.file = event.target.files[0];
  
      if (this.file) {
  
         console.log(this.file.name);
  
         
  
          
      }}
   
    get f() { return this.registerForm.controls; }
  

    onSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {
        //alert('Failed!! :-)\n\n');
          return;
      }
    

    
      this.spinner.show();
    this.imageUploadService.upload(
      
      this.file,
      this.registerForm.value.algo
      
    ).subscribe((response:any)=> {
      console.log(response.message)
      if (response.message=='Uploaded the file successfully '){
        
        this.spinner.hide();
        console.log(response);
        this.dialogRef.close();
        Swal.fire({
          title: 'file saved',
          icon:'success',
          timer:2000,
          showConfirmButton:false,
          width: '500px',
          
        
        });
        }else{
          this.spinner.hide();
          this.dialogRef.close();
          Swal.fire({
            title: 'file save failed',
            icon:'error',
            timer:2000,
            showConfirmButton:false,
            width: '500px',
            
          
          });
        }
      
      }
    )
   
  }
  Close(){
    this.dialogRef.close();
  }
}
