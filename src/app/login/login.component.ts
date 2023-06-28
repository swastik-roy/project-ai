import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private name:Router,private http:HttpClient) {

  }
  ngOnInit(): void {}
  signup=new FormGroup({
    user:new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/^[A-Z]+$/i)]),
    password:new FormControl(null,[Validators.required,Validators.minLength(2),Validators.pattern('^[a-zA-Z0-9]+$')])
  })
  Password?:string 
  
  registerSubmited(){
    console.log(this.signup.value)
  }
  get f(): { [key: string]: AbstractControl } {
    return this.signup.controls;
  }
  url='https://64zpdy0rs5.execute-api.us-east-1.amazonaws.com/develop/resources';
  save(){
    if(this.signup.value.password){
      this.Password=this.signup.value.password
      const headers = new HttpHeaders().set('authorizationToken',this.Password);
      console.log(headers)
      this.http.get<any>(this.url,{headers}).subscribe(res =>{
        console.log(res)
        if(res.success){
          this.name.navigate(['/home'])
        }else{
          console.log("Authentication Failed")
        }
      })
    }

  }
}
