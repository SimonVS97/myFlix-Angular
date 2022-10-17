import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';



//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-app-svs.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // returns the api call for the user registration endpoint
  // observable is promise
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // returns the api call for the login endpoint
  public userLogin(userName: any, userPassword: any): Observable<any> {
    return this.http.post(apiUrl + 'login', { Username: userName, Password: userPassword }).pipe(
      catchError(this.handleError)
    );
  }

  // return the api call for get all movies endpoint
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // return the api call for get a single movie endpoint 
  public getSingleMovie(movieName: any): Observable<any> {
    console.log(movieName);
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + movieName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // return the api call for a get data on a genre by name
  public getGenre(genreName: any): Observable<any> {
    console.log(genreName);
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genre/' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // returns the api call for get data on a director by name
  public getDirector(directorName: any): Observable<any> {
    console.log(directorName);
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + directorName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  // returns the api call for get data for all users
  public getAllUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  // returns the api call for get data on a user by username
  public getUser(): Observable<any> {
    const userName = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + userName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // returns the api call for update user info
  public putUser(userName: any, updateData: any): Observable<any> {
    console.log(userName);
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userName, updateData, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    })
  }

  // returns the api call for deleting user
  public deleteUser(userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    })
  }

  // returns the api call for adding a new movie to list of favorites
  public postMovie(movieName: any, userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + userName + '/movies/' + movieName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    })
  }

  // returns the api call for deleting a movie from their list of favorites
  public deleteMovie(userName: any, movieName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userName + '/movies/' + movieName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    })
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}