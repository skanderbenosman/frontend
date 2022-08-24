import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 
    this.http = http;
  }
  saveUser(formData: FormData): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    //const formData: FormData = new FormData();
    
    
    
    return this.http.post('http://localhost:8080/registration', formData , {headers});

  }
  loginUser(user: any): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    return this.http.post('http://localhost:8080/login', user , {headers});

  }
  getAllUsers(token: any): Observable<any>{
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.get('http://localhost:8080/users', {headers});

  }
  UpdateUser(formData: FormData): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    //const formData: FormData = new FormData();
    
    
    
    return this.http.post('http://localhost:8080/updateuser', formData , {headers});

  }
  getUpdatedUser(formData: FormData): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    //const formData: FormData = new FormData();
    
    
    
    return this.http.post('http://localhost:8080/getuserupdated/',formData ,{headers});

  }
  getNewUsers(token: any): Observable<any>{
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.get('http://localhost:8080/newusers', {headers});

  }
  getNewUsers2(token: any): Observable<any>{
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.get('http://localhost:8080/newusers2', {headers});

    
  }
  getNbUsers(token: any): Observable<any>{
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.get('http://localhost:8080/nbusers', {headers});

  }
  userUpdatedState(formData: FormData): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    //const formData: FormData = new FormData();
    
    
    
    return this.http.post('http://localhost:8080/userUpdatedState/',formData ,{headers});

  }

}
