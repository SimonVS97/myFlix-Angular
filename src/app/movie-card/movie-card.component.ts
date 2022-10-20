import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  show: boolean = true;
  favMovies: any[] = [];
  /**
   * 
   * @param fetchApiData import methods to call api
   * @param dialog import matdialog component
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
  ) { }

  /**
   * getting the data of all movies in the data base to render UI
   * getting data of all the fav movies of the user
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }
  /**
   * method to get data on the fav movies of the user
   */
  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favMovies = resp.FavoriteMovies;
      console.log(this.favMovies);
    })
  }
  /**
   * 
   * @param id of the movie to check
   * @returns whether the movie is a fav movie of the user
   */
  isFav(id: string): boolean {
    return this.favMovies.includes(id);
  }

  /**
   * 
   * @param id of the movie to add to the list of fav movies of the user
   */
  addFav(id: string): void {
    this.favMovies.push(id);
    this.fetchApiData.postMovie(id).subscribe((resp: any) => {
    })
  }
  /**
   * 
   * @param id of the movie to remove from the list of fav movies of the user
   */
  removeFav(id: string): void {
    let elemToRemove = this.favMovies.indexOf(id);
    this.favMovies.splice(elemToRemove, 1);
    this.fetchApiData.deleteMovie(id).subscribe((resp: any) => {
    })
  }
  /**
   * method to get data on all movies
   * returns data on all the movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
  /**
   * 
   * @param name of the genre
   * @param description of the movie genre
   */
  openGenreInfo(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '280px'
    });
  }
  /**
   * 
   * @param name of the director
   * @param bio of the director
   */
  openDirectorInfo(name: string, bio: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        Name: name,
        Bio: bio
      },
      width: '280px'
    })
  }
  /**
   * 
   * @param description of the synopsis of the movie
   */
  openSynopsisInfo(description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Synopsis: description
      }
    })
  }


}
