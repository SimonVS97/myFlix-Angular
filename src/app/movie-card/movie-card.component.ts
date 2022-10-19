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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favMovies = resp.FavoriteMovies;
      console.log(this.favMovies);
    })
  }

  isFav(id: string): boolean {
    return this.favMovies.includes(id);
  }

  addFav(id: string): void {
    this.favMovies.push(id);
    this.fetchApiData.postMovie(id).subscribe((resp: any) => {
      console.log(resp);
    })
  }

  removeFav(id: string): void {
    let elemToRemove = this.favMovies.indexOf(id);
    this.favMovies.splice(elemToRemove, 1);
    this.fetchApiData.deleteMovie(id).subscribe((resp: any) => {
      console.log(resp);
    })
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      console.log(this);
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreInfo(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '280px'
    });
  }

  openDirectorInfo(name: string, bio: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        Name: name,
        Bio: bio
      },
      width: '280px'
    })
  }

  openSynopsisInfo(description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Synopsis: description
      }
    })
  }


}
