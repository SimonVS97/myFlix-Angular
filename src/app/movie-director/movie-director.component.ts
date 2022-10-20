import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {

  constructor(
    /**
     * inject dialog with data on the name of the director and his/her bio
     */
    @Inject(MAT_DIALOG_DATA) public data: {
      Name: string,
      Bio: string
    },
  ) { }

  ngOnInit(): void {
  }

}
