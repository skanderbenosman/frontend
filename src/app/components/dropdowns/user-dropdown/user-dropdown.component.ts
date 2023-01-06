import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { createPopper } from "@popperjs/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { UserprofileComponent } from "../../dialog/userprofile/userprofile.component";
import { UserService } from "src/app/service/user.service";
import { UploadFilesService } from "src/app/service/upload-files.service";
import { DomSanitizer } from "@angular/platform-browser";
import { areAllEquivalent } from "@angular/compiler/src/output/output_ast";
import * as fileSaver from 'file-saver';
@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
})
export class UserDropdownComponent implements AfterViewInit {
  dropdownPopoverShow = false;
  public user: any = {};
  public loginuser: any = {};
  url:any;
  firstname:any;
  lastname: any;
  previewSignsrc:any;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
  constructor( private router: Router,private dialog: MatDialog,private fileservice :UploadFilesService,private sanitizer: DomSanitizer) {
   
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }
  UpdateProfile(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(UserprofileComponent, dialogConfig);
  }
  ngOnInit(): void {
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.user=this.loginuser.user;
    console.log(this.loginuser);
    console.log(this.user.firstName);
  this.firstname=this.user.firstName;
  
  this.url="http://localhost:8080/image/getaaa/"+this.user.id;
this.lastname=this.user.lastName;}
}
