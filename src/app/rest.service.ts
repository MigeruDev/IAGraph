import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import {of} from "rxjs/observable/of";
import { map, catchError, tap } from 'rxjs/operators';


const endpoint = 'http://127.0.0.1:5000/';
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()
export class RestService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getNodes(): Observable<any> {
    return this.http.get(endpoint + 'graph').pipe(
      map(this.extractData));
  }
  
  generateRandomGraph (graph): Observable<any> {
    console.log(graph);
    return this.http.post<any>(endpoint + 'generate_random', JSON.stringify(graph), httpOptions).pipe(
      tap((graph) => console.log(`generate graph w/ id=${graph.id}`)),
      catchError(this.handleError<any>('generateRandomGraph'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}
