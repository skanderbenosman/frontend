import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFilesService } from 'src/app/service/upload-files.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deletef',
  templateUrl: './deletef.component.html',
 
})
export class DeletefComponent implements OnInit {
   id :any;
   name:any;
  constructor(private fileservice :UploadFilesService, private dialogRef: MatDialogRef<DeletefComponent>,@Inject(MAT_DIALOG_DATA) public data
    ) {


     }

  ngOnInit(): void {
  }
  delete(id:any){
     this.fileservice.DeleteFile2(id).subscribe((response) => {

    if(response.message = "delete the file successfully"){
      this.dialogRef.close();
      Swal.fire({
        title: 'File deleted',
        icon:'success',
        timer:2000,
        showConfirmButton:false,
        width: '500px',
        
      
      });
    
  }else{
    this.dialogRef.close();
    Swal.fire({
      title: 'Delete file error',
      icon:'error',
      timer:2000,
      showConfirmButton:false,
      width: '500px',
      
    
    });
  }

},(error:HttpErrorResponse )=>{
  this.dialogRef.close();
  Swal.fire({
    title: 'Delete file error',
    icon:'error',
    timer:2000,
    showConfirmButton:false,
    width: '500px',
    
  
  });
})
  }
  annuler(){
    this.dialogRef.close();
  }
}
