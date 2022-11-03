import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { UserComponent } from './layouts/user/user.component';
import { Tables2Component } from './views/user/tables2/tables2.component';
import { TablesComponent } from './views/admin/tables/tables.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';

import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";
import { FormsModule, ReactiveFormsModule,FormGroup, FormBuilder,  Validators  } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "./auth.guard";
import { LoginAuthService } from "./service/login-auth.service";
import { MatTableModule } from "@angular/material/table";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { UserprofileComponent } from './components/dialog/userprofile/userprofile.component';
import { CardStats2Component } from './components/cards/card-stats2/card-stats2.component';

import { CardTable2Component } from './components/cards/card-table2/card-table2.component';
import { AddfileComponent } from './components/dialog/addfile/addfile.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxSpinnerModule } from "ngx-spinner";
import { UserHeaderComponent } from './components/headers/user-header/user-header.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { ResetpwdComponent } from './views/auth/resetpwd/resetpwd.component';
import { SendemailComponent } from './views/auth/sendemail/sendemail.component';
import {NgxCaptchaModule} from  '@binssoft/ngx-captcha';
import { NgxLoadingXModule } from 'ngx-loading-x';
import { DeletefComponent } from './components/dialog/deletef/deletef.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    TablesComponent,
    LoginComponent,
    RegisterComponent,
    UserprofileComponent,
    CardStats2Component,
    UserComponent,
    Tables2Component,
    CardTable2Component,
    AddfileComponent,
    UserHeaderComponent,
    UserSidebarComponent,
    ResetpwdComponent,
    SendemailComponent,
    DeletefComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    NgxCaptchaModule,
    NgxLoadingXModule 
  ],
  providers: [AuthGuard,
    LoginAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
