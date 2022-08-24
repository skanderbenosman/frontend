import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL: string = "http://localhost:8080/";
  constructor(private http: HttpClient) { 
    this.http = http;
  }
  saveUser(formData: FormData): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    //const formData: FormData = new FormData();
    
    
    
    return this.http.post(this.baseURL +'registration', formData , {headers});

  }
  loginUser(user: any): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    return this.http.post(this.baseURL +'login', user , {headers});

  }
  getAllUsers(token: any): Observable<any>{
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.get(this.baseURL +'users', {headers});

  }
  UpdateUser(formData: FormData): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    //const formData: FormData = new FormData();
    
    
    
    return this.http.post(this.baseURL +'updateuser', formData , {headers});

  }
  getUpdatedUser(formData: FormData): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    //const formData: FormData = new FormData();
    
    
    
    return this.http.post(this.baseURL +'getuserupdated/',formData ,{headers});

  }
  getNewUsers(token: any): Observable<any>{
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.get(this.baseURL +'newusers', {headers});

  }
  getNewUsers2(token: any): Observable<any>{
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.get(this.baseURL +'newusers2', {headers});

    
  }
  getNbUsers(token: any): Observable<any>{
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.get(this.baseURL +'nbusers', {headers});

  }
  userUpdatedState(formData: FormData): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    //const formData: FormData = new FormData();
    
    
    
    return this.http.post(this.baseURL +'userUpdatedState/',formData ,{headers});

  }

}
