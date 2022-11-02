import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { LoginAuthService } from "src/app/service/login-auth.service";
import { MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { UserService } from "src/app/service/user.service";
import { HeaderStatsComponent } from "../../headers/header-stats/header-stats.component";
import { Router } from "@angular/router";
@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  public loginuser: any = {};
  public users: any [];
 displayedColumns = [ 'firstName', 'lastName', 'email','phoneNumber','eanbled','actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: LoginAuthService,private userservice :UserService,private router:Router ) {
    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
    
    
  }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    this.userservice.getAllUsers(this.loginuser.token).subscribe(user => {
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
  Desactiver(user:any){
    const formData = new FormData();
    formData.append('id',user.id);
    this.userservice.userUpdatedState(formData).subscribe((response) => {
      if (response){
        this.userservice.getAllUsers(this.loginuser.token).subscribe(user => {
          this.dataSource = new MatTableDataSource(user) ;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          window.location.reload();
    
       
        });  console.log(response.message);
      
      
      }});
       

  }
  Activer(user:any){
    const formData = new FormData();
    formData.append('id',user.id);
    this.userservice.userUpdatedState(formData).subscribe((response) => {
      if (response){
        console.log(response.message);
        this.userservice.getAllUsers(this.loginuser.token).subscribe(user => {
          this.dataSource = new MatTableDataSource(user) ;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          window.location.reload();
       
        });
      
      }});
       
  }
  
  
 
}

