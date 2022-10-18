import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatInputModule } from '@angular/material/input';
import { NavBarComponent } from '../nav-bar/nav-bar.component';



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  FavoriteMovies: any[] = [];

  @Input() NewUserData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: {
    _id: any,
    Username: any,
    Password: any,
    Email: any,
    Birthday: any
  } = {
      _id: "",
      Username: "",
      Password: "",
      Email: "",
      Birthday: ""
    };

  constructor(
    public fetchApiData: FetchApiDataService,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): any {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      console.log(resp);
      this.user._id = resp._id;
      this.user.Username = resp.Username;
      this.user.Password = resp.Password;
      this.user.Email = resp.Email;
      this.user.Birthday = resp.Birthday;
      this.FavoriteMovies = resp.FavoriteMovies;
      return this.user;
    })
  }

  updateUser(): void {
    let name = this.user.Username;
    let body = this.NewUserData;
    this.fetchApiData.putUser(name, body).subscribe((resp: any) => {
      console.log(resp);
    })
  }

}
