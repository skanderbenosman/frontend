import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { LoginAuthService } from "src/app/service/login-auth.service";
import { MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { UserService } from "src/app/service/user.service";
import { UploadFilesService } from "src/app/service/upload-files.service";
import * as fileSaver from 'file-saver';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { AddfileComponent } from "../../dialog/addfile/addfile.component";
import Swal from "sweetalert2";
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from "@angular/common/http";


@Component({
  selector: 'app-card-table2',
  templateUrl: './card-table2.component.html',
  
})
export class CardTable2Component implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  public loginuser: any = {};
  public files: any [];
  public load = false;
  Download: boolean;
  displayedColumns = [ 'name', 'algo','actions','actions2'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private authService: LoginAuthService,private userservice :UserService,private fileservice :UploadFilesService,private dialog: MatDialog,private spinner: NgxSpinnerService) {
    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
    
    
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.fileservice.getFiles().subscribe(user => {
      this.dataSource = new MatTableDataSource(user) ;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

   
    });

}
applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}
DownloadFile(id: any,fname:any){

 
this.spinner.show();
this.load = true;
  this.fileservice.getDownloadFile(id).subscribe((response) => {
    if (response){
      console.log(response);
      if(response = "Uploaded the file successfully"){
        console.log("ali");
        this.fileservice.downloadFile(id,fname).subscribe(response => {
          console.log(response)

          let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
          const url = window.URL.createObjectURL(blob);
          fileSaver.saveAs(blob, fname);
          
          this.spinner.hide();
          this.load = false;
         this.fileservice.DeleteFile(id).subscribe(response => {})

        }, (error: HttpErrorResponse) => {console.log(error.message)
         
       this.spinner.hide();
       this.load = false;
       this.fileservice.DeleteFile(id).subscribe(response => {})
                    ; Swal.fire({
                      title: 'Error downloading the file',
                      icon:'error',
                      timer:2000,
                      showConfirmButton:false,
                      width: '500px',
                      
                    
                    });});
        //window.open("http://test:test@192.168.1.104:8000/"+id+"/"+fname);
      }
      
    }
  }, (error: HttpErrorResponse) => {console.log(error.message)
         
    this.spinner.hide();
    this.load = false;
                 Swal.fire({
                   title: 'Error downloading the file',
                   icon:'error',
                   timer:2000,
                   showConfirmButton:false,
                   width: '500px',
                   
                 
                 });})
 
              

}
addfile(){
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  const dialogRef =this.dialog.open(AddfileComponent,{ width: '450px'});
  dialogRef.afterClosed().subscribe(result=>
    
    this.fileservice.getFiles().subscribe(user => {
      console.log("mohsen");
      this.dataSource = new MatTableDataSource(user) ;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

   
    })
  );
  
}
Delete(id:any){
  this.fileservice.DeleteFile2(id).subscribe((response) => {
    if(response.message = "delete the file successfully"){
      Swal.fire({
        title: 'File deleted',
        icon:'success',
        timer:2000,
        showConfirmButton:false,
        width: '500px',
        
      
      });
      this.fileservice.getFiles().subscribe(user => {
        console.log("mohsen");
        this.dataSource = new MatTableDataSource(user) ;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  
     
      })
  }else{
    Swal.fire({
      title: 'Delete file error',
      icon:'error',
      timer:2000,
      showConfirmButton:false,
      width: '500px',
      
    
    });
  }

},(error:HttpErrorResponse )=>{
  
  Swal.fire({
    title: 'Delete file error',
    icon:'error',
    timer:2000,
    showConfirmButton:false,
    width: '500px',
    
  
  });
})
}
}
