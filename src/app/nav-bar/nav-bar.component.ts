import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  /**
   * method to navigate to profile view
   */
  toProfile() {
    this.router.navigate(['profile']);
  }
  /**
   * method to navigate to movies view
   */
  toMovies() {
    this.router.navigate(['movies']);
  }

}
