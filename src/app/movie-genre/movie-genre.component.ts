import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})
export class MovieGenreComponent implements OnInit {
  /**
   * 
   * @param data inject dialog with data for the name and description of a movie genre
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      Name: string,
      Description: string
    },
  ) { }

  ngOnInit(): void {
  }


}
