import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { createPopper } from "@popperjs/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { UserprofileComponent } from "../../dialog/userprofile/userprofile.component";
@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
})
export class UserDropdownComponent implements AfterViewInit {
  dropdownPopoverShow = false;
  public user: any = {};
  public loginuser: any = {};
  firstname:any;
  lastname: any;
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
  constructor( private router: Router,private dialog: MatDialog) {
   
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
this.lastname=this.user.lastName;}
}
