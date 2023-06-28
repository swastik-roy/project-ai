import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

interface card {
  body: string;

  // Key:string
}

interface Card {
  ResourceARN: string;
  Tags: { Key: string; Value: string }[];
}

interface Tag {
  Key: string;

  Value: string;
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

  searchTerm = ''; // Add searchTerm property

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  clear(){
    this.searchTerm=''
  }
  getData() {

    

    this.http.get<any>(this.url).subscribe((res: any) => {
      const parsedBody = JSON.parse(res.body);
      this.responseData = parsedBody;
    });
  }

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
}
