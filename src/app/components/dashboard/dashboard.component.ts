import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})

export class DashboardComponent implements OnInit{

  // @ts-ignore
  textInput: string;
  // @ts-ignore
  textOutput: string;

  constructor(
    public authService: AuthService,
    private http: HttpClient
  ) {}
  //
  ngOnInit(): void {

  }
  //

  onSubmit() {
    const url = `api/summarize/${this.textInput}`;
    console.log('Submitted')
    this.textOutput = 'Summarizing..'
    this.http.get(url).subscribe((response: any) => {
      console.log(response);
      this.textOutput = response.summary;
    });
  }
}
