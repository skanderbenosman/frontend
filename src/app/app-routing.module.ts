import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth.guard";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { UserComponent } from "./layouts/user/user.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";
import { ResetpwdComponent } from "./views/auth/resetpwd/resetpwd.component";
import { SendemailComponent } from "./views/auth/sendemail/sendemail.component";

// no layouts views

import { Tables2Component } from "./views/user/tables2/tables2.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
},
  // admin views
  {
    path: "admin",
    component: AdminComponent,canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
      
      { path: "tables", component: TablesComponent },
     
     { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "resetpwd", component: SendemailComponent },
      { path: "resetpwd2/:token", component: ResetpwdComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },{path: "user",component: UserComponent,canActivate: [AuthGuard], children: [
    { path: "tables", component: Tables2Component },
    
  ], },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
