import { Component, OnInit } from "@angular/core";
import { LoginAuthService } from "src/app/service/login-auth.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-header-stats",
  templateUrl: "./header-stats.component.html",
})
export class HeaderStatsComponent implements OnInit {
  loginuser: any;
   NewUser: number ;
   NewUser2: number ;
   statArrow:any;
   statPercentColor:any;
   statPercent:number;
   NumberUser: number;
  constructor(private authService: LoginAuthService,private userservice :UserService) {
    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.userservice.getNewUsers(this.loginuser.token).subscribe(user => {
      this.NewUser=user;
      console.log(this.NewUser)
      this.userservice.getNewUsers2(this.loginuser.token).subscribe(user2 => {
        this.NewUser2=user2;
        if(this.NewUser > this.NewUser2){
          this.statPercent=this.NewUser-this.NewUser2;
          console.log("this.NewUser"+  this.NewUser);
          console.log("this.NewUser2"+this.NewUser2);
          this.statArrow='up';
          this.statPercentColor='text-emerald-500'
        }else{
          this.statPercent=this.NewUser-this.NewUser2;
          console.log("this.NewUser2"+this.NewUser2);
          this.statArrow='down';
          this.statPercentColor='text-red-500'
        }
           
      });

    });
    this.userservice.getNbUsers(this.loginuser.token).subscribe(user => {
      this.NumberUser=user;
     
           
      });

    
   
  }

}
