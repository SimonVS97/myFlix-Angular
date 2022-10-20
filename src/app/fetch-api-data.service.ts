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
  // pass the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }


  /**
   * @function userRegistration
   * @param userDetails object that contains Username, Password, Email Birthday
   * @returns The post request to register a new user
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * 
   * @param userName 
   * @param userPassword 
   * @returns the post request to Log a user in
   */
  public userLogin(userName: any, userPassword: any): Observable<any> {
    return this.http.post(apiUrl + 'login', { Username: userName, Password: userPassword }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * 
   * @returns the get request to request all movie data
   */
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

  /**
   * 
   * @param movieName 
   * @returns the get request for the data on a single movie
   */
  public getSingleMovie(movieName: any): Observable<any> {
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

  /**
   * 
   * @param genreName 
   * @returns the get request for the data on a genre
   */
  public getGenre(genreName: any): Observable<any> {
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

  /**
   * 
   * @param directorName 
   * @returns the get request for the data on a director
   */
  public getDirector(directorName: any): Observable<any> {
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
  /**
   * 
   * @returns the get request to request data on all users
   */
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
  /**
   * 
   * @returns the get request to request data on a single user
   */
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

  /**
   * 
   * @param userName name of the user to be updated
   * @param updateData object that contains the new data for the user
   * @returns the put request to update the data of a user
   */
  public putUser(userName: any, updateData: any): Observable<any> {
    console.log(userName);
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userName, updateData, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    })
  }

  /**
   * 
   * @param userName name of the user to be deleted
   * @returns the delete request to delete a specific user
   */
  public deleteUser(userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    })
  }

  /**
   * 
   * @param movieName name of the movie to be added to favorites
   * @returns the post call to add a movie to list of favorites of a spevific user
   */
  public postMovie(movieName: any): Observable<any> {
    const userName = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(token);
    return this.http.post(apiUrl + 'users/' + userName + '/movies/' + movieName, {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    })
  }


  /**
   * 
   * @param movieName name of the movie to be deleted from the users lsit of favorites
   * @returns the request to delete a movie from a users list of favorites
   */
  public deleteMovie(movieName: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.delete(apiUrl + 'users/' + userName + '/movies/' + movieName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
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