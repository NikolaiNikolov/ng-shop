import { Injectable, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Observable } from "rxjs/Rx";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APP_KEY, APP_SECRET } from './../../config/kinvey.config'
import { HttpService } from '../http-service/http.service';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

@Injectable()
export class HttpClientService {
  constructor(
    private http: HttpClient,
    private toastr: ToastsManager
  ) { }

  public get<T>(url: string, type: string) {
    return this.http
      .get(url, { headers: this.createHeaders(type) })
      .pipe(
      catchError(err => this.handleError(err))
      )
  }

  public post<T>(url: string, body: any, type: string) {
  return this.http
      .post( url, JSON.stringify(body), {headers: this.createHeaders(type)})
      .pipe(
      catchError(err => this.handleError(err)))
  }


  public put<T>(url: string, body: any, type: string) {
    return this.http
      .put<T>(url, body, { headers: this.createHeaders(type) })
      .pipe(
      catchError(err => this.handleError(err))
      )
  }


  public delete<T>(url: string, id: number, type: string) {
    return this.http
      .delete<T>(`${url}/${id}`, { headers: this.createHeaders(type) })
      .pipe(
      catchError(err => this.handleError(err))
      )
  }

  private handleError(error: any) {
    if (error.status) {
      // Other status codes needed in app
      this.toastr.error(error.error.description, "Error!")
    }
    return Observable.throw(error)
  }

  private createHeaders(type : string) : HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${APP_KEY}:${APP_SECRET}`)}`,
        'Content-Type': 'application/json'
      })
    } else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      })
    }
  }

}