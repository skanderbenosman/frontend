import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  private subject = new Subject<any>();
  isLoggedIn(){
    if (localStorage.getItem('currentUser')){
      this.subject.next({status: true});
    }else {
      this.subject.next({status: false});
    }
  }
  clearStatus(){
    this.subject.next();
  }
  getStatus(): Observable<any> {
    return this.subject.asObservable();
  }
  constructor(private http: HttpClient) { 
    this.http = http;
  }
  loginUser(user: any): Observable<any>{
    console.log("skander"+user)
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    return this.http.post('http://localhost:8080/login', user , {headers});

  }
  getAllUsers(token: any): Observable<any>{
    console.log("aa="+token);
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.get('http://localhost:8080/users', {headers});

  }
}
