import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

export abstract class ResourceService<T> {

  private url:string = '';

  httpClient: HttpClient;
  endpoint: string;
  sufixUrl:string;
  urlRest:string;

  setParams(
    httpClient: HttpClient,
    endpoint: string,
    sufixUrl?:string
  ):void {
    this.httpClient = httpClient;
    this.endpoint = endpoint;
    this.sufixUrl = (sufixUrl === undefined ? 'rest/s' : sufixUrl);
    this.urlRest = `${this.url}/${this.sufixUrl}/${this.endpoint}`;
  }

  findAll(objParams?:any):Observable<T>{
    const options = {
      params: new HttpParams({fromObject:objParams})
    };
    return this.httpClient.get<T>(this.urlRest,options)
      .pipe(
        catchError(this.handleError)
      );
  }

  find(id:number):Observable<T>{
    return this.httpClient.get<T>(`${this.urlRest}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  create(dataPost:any):Observable<T>{
    return this.httpClient.post<T>(this.urlRest,dataPost)
    .pipe(
      catchError(this.handleError)
    );
  }

  update(id:number,dataPost:any):Observable<T>{
    return this.httpClient.put<T>(`${this.urlRest}/${id}`,dataPost)
    .pipe(
      catchError(this.handleError)
    );
  }

  createOrUpdate(dataPost:any, id?:number):Observable<T>{
    if(id === undefined){
      return this.httpClient.post<T>(this.urlRest,dataPost)
      .pipe(
        catchError(this.handleError)
      );
    }
    return this.httpClient.put<T>(`${this.urlRest}/${id}`,dataPost)
    .pipe(
      catchError(this.handleError)
    );
  }

  delete(id:number):Observable<T>{
    return this.httpClient.delete<T>(`${this.urlRest}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}