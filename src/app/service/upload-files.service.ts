import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  public loginuser: any = {};
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  upload(file: File, aa: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('param1', aa);
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.loginuser.token});
    return this.http.post('http://localhost:8080/upload', formData , {headers});

  }
  getFiles(): Observable<any> {
      this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
      const headers = new HttpHeaders({Authorization: 'Bearer ' + this.loginuser.token});
      return this.http.get('http://localhost:8080/getuserfile', {headers});


  }
  getDownloadFile(id: any): Observable<any> {
    
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.loginuser.token});
    const formData: FormData = new FormData();
    formData.append('id', id);
    
    return this.http.post('http://localhost:8080/download',formData, {headers});


}
downloadFile(id:any,fname:any): any {
 
  const headers2 = new HttpHeaders({Authorization: 'Basic dGVzdDp0ZXN0'});

  return this.http.get("http://192.168.1.104:8080/"+id+"/"+fname, {responseType: 'blob'});
}
DeleteFile(id: any): Observable<any> {
    
  this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
  const headers = new HttpHeaders({Authorization: 'Bearer ' + this.loginuser.token});
  const formData: FormData = new FormData();
  formData.append('id', id);
  
  return this.http.post('http://localhost:8080/delete',formData, {headers});


}
}
