import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, catchError, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransService {

  apiUrl = "http://alltheclouds.com.au";

  headers = new HttpHeaders({
    'content-encoding': 'gzip ',
    'content-type': 'application/json',
    'accept':'text/plain',
    "api-key": "API-8OU5KUHNBZ0GOQ5"
    
  });

constructor(private http: HttpClient) { }

getProducts(): Observable < any > {
  const url = `${this.apiUrl}/${'api/Products'}`;
  return this.http.get<any>(url, { headers: this.headers }).pipe(
    map((response: any) => this.ReturnResponseData(response)),
    catchError(this.handleError<any>(`Products`))
  );
}

saveOrders(form:any): Observable < any > {
  const url = `${this.apiUrl}/${'api/Orders'}`;
  return this.http.post<any>(url,form,{ headers: this.headers }).pipe(
    map((response: any) => this.ReturnResponseData(response)),
    catchError(this.handleError<any>(`Products`))
  );
}

  private ReturnResponseData(response: any) {
  return response;
}

  private handleError<T>(operation = 'operation', result ?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}

  private log(message: string) {
  console.log(message);
}
}
