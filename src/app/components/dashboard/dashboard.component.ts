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
    public authService: AuthService
    // public http: HttpClient
  ) {}
  //
  ngOnInit(): void {

  }
  //
  onSubmit() {
    const url = `https://text-summarization-model-jvgcexcekq-uc.a.run.app/summarize/`;
    // this.http.get(url).subscribe((response: any) => {
    //   console.log(response);
  //     // Do something with the
  //     // this.textOutput = response.data;
  //   });
    this.textOutput = "helloooo"
  }
}
