import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

export abstract class ResourceService<T> {

  private url:string = '';

  endpoint: string;
  sufixUrl:string;

  constructor(
    private _httpClient: HttpClient
  ) { }

  /**
   * Definition of endpoint and sufixUrl variables
   */
  abstract setEndPoint(endpoint: string,sufixUrl?:string): void;
  
  getUrlRequest(): string {
    if(this.endpoint === undefined){
      throw new Error('Endpoint is undefined');
    }
    let sufixUrl = (this.sufixUrl === undefined ? 'rest/s' : this.sufixUrl);
    return `${this.url}${sufixUrl}/${this.endpoint}`;
  }

  findAll(objParams?:any):Observable<T>{
    let urlRest = this.getUrlRequest();
    const options = {
      params: new HttpParams({fromObject:objParams})
    };
    return this.httpClient.get<T>(urlRest,options)
      .pipe(
        catchError(this.handleError)
      );
  }

  find(id:number):Observable<T>{
    let urlRest = this.getUrlRequest();
    return this.httpClient.get<T>(`${urlRest}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  create(dataPost:any):Observable<T>{
    let urlRest = this.getUrlRequest();
    return this.httpClient.post<T>(urlRest,dataPost)
    .pipe(
      catchError(this.handleError)
    );
  }

  update(id:number,dataPost:any):Observable<T>{
    let urlRest = this.getUrlRequest();
    return this.httpClient.put<T>(`${urlRest}/${id}`,dataPost)
    .pipe(
      catchError(this.handleError)
    );
  }

  createOrUpdate(dataPost:any, id?:number):Observable<T>{
    let urlRest = this.getUrlRequest();
    if(id === undefined){
      return this.httpClient.post<T>(urlRest,dataPost)
      .pipe(
        catchError(this.handleError)
      );
    }
    return this.httpClient.put<T>(`${urlRest}/${id}`,dataPost)
    .pipe(
      catchError(this.handleError)
    );
  }

  delete(id:number):Observable<T>{
    let urlRest = this.getUrlRequest();
    return this.httpClient.delete<T>(`${urlRest}/${id}`)
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
