import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Card {
  ResourceARN: string;
  Tags: { Key: string; Value: string }[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  responseData: Card[] = [];
  value: string = '';
  url =
    'https://64zpdy0rs5.execute-api.us-east-1.amazonaws.com/develop/resources';

  searchTerm = '';
  Password?: string;
  constructor(private http: HttpClient, private route: Router) {}

  //getData() is called inside ngOnInit() as we want to display the data imedietly when the app opens
  ngOnInit(): void {
    this.getData();
  }

  //clear() is called when we click on the cross button
  //on clicking this button the input box gets empty and the table again gets reloaded
  clear() {
    this.searchTerm = '';
    this.getData();
  }

  //getData() used for fetching the list of resources from the api
  getData() {
    if (localStorage.getItem('password')) {
      const password = localStorage.getItem('password');
      const headers = new HttpHeaders().set(
        'authorizationToken',
        password ? password : ''
      );
      this.http.get<any>(this.url, { headers }).subscribe((res: any) => {
        const parsedBody = JSON.parse(res.body);
        this.responseData = parsedBody;
      });
    }
  }

  //search() is used to impliment searching in the UI
  search() {
    const searchTerm = this.searchTerm.trim().toLowerCase();
    if (searchTerm === '') {
      this.getData();
    } else {
      const filteredData = this.responseData.filter((item) => {
        const resourceArn = item.ResourceARN.toLowerCase();
        const tags = item.Tags.map((tag: { Key: string; Value: string }) =>
          tag.Value.toLowerCase()
        );
        return (
          resourceArn.includes(searchTerm) ||
          tags.some((tag: string) => tag.includes(searchTerm))
        );
      });
      this.responseData = filteredData;
    }
  }

  //logout() used to logout the user
  logout() {
    localStorage.clear();
    this.route.navigate(['login']);
  }
}
