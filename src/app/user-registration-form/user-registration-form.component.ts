import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API callls we created
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';

// @component decorator tells angular that the class ie component below is a component
@Component({
  // selector defines custom HTML elemt into which this component will render
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  // @ decorator: bind the form input values to this object, i.e. it's properties
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  // userData object will be passed into api call

  /**
   * 
   * @param fetchApiData pass the api Data service so the methods can be called
   * @param dialogRef pass the UserRegistrationFormcomponent inside a dialog so it can used
   * @param snackBar pass the snackbar component so it can displyed
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * function that registers the user
   */
  registerUser(): void {
    /**
     * function that takes user data and executes call to server
     */
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal success!
      this.snackBar.open(result, 'OK', {
        duration: 2000
      })
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      })
    }
    )
  }

}
