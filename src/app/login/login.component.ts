import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private route: Router, private http: HttpClient) {}
  ngOnInit(): void {}
  //creating FormGroup which will posses the username and password and setting those in signup
  //inside FormGroup we have FormControl which takes the value as user and password and also validates those
  signup = new FormGroup({
    user: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Z]+$/i),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ]),
  });
  Password?: string;

  get f(): { [key: string]: AbstractControl } {
    return this.signup.controls;
  }

  //url is the main api url
  url =
    'https://64zpdy0rs5.execute-api.us-east-1.amazonaws.com/develop/resources';

  //this function works when we click on the login button
  //on clicking this button firstely it fetches the password and puts that in httpheaders
  //after that we use a get method in which we added the headers so the it can authenticate the user
  //if the response is success i.e, the user has put the correct password then it will redirect to home component or else it will alert the error message
  save() {
    if (this.signup.value.password) {
      this.Password = this.signup.value.password;
      const headers = new HttpHeaders().set(
        'authorizationToken',
        this.Password
      );
      localStorage.setItem('password', this.Password);
      console.log(headers);
      this.http.get<any>(this.url, { headers }).subscribe(
        (res) => {
          console.log(res);
          if (res) {
            this.route.navigate(['/home']);
          }
        },
        (err) => {
          alert('Incorrect Credential');
        }
      );
    } else {
      alert('No Credential');
    }
  }
}
