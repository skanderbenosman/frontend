import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  public loginuser: any = {};
  baseURL: string = "http://localhost:8080/";
  constructor(private http: HttpClient) { }
  upload(file: File, aa: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('param1', aa);
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.loginuser.token});
    return this.http.post(this.baseURL + 'upload', formData , {headers});

  }
  getFiles(): Observable<any> {
      this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
      const headers = new HttpHeaders({Authorization: 'Bearer ' + this.loginuser.token});
      return this.http.get(this.baseURL + 'getuserfile', {headers});


  }
  getDownloadFile(id: any): Observable<any> {
    
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.loginuser.token});
    const formData: FormData = new FormData();
    formData.append('id', id);
    
    return this.http.post(this.baseURL + 'download',formData, {headers});


}
downloadFile(id:any,fname:any): any {
 
 

  return this.http.get("http://192.168.1.104:8080/"+id+"/"+fname, {responseType: 'blob'});
}
DeleteFile(id: any): Observable<any> {
    
  this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
  const headers = new HttpHeaders({Authorization: 'Bearer ' + this.loginuser.token});
  const formData: FormData = new FormData();
  formData.append('id', id);
  
  return this.http.post(this.baseURL + 'delete',formData, {headers});


}
DeleteFile2(id: any): Observable<any> {
    
  this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
  const headers = new HttpHeaders({Authorization: 'Bearer ' + this.loginuser.token});
  const formData: FormData = new FormData();
  formData.append('id', id);
  
  return this.http.post(this.baseURL + 'delete2',formData, {headers});


}

}
