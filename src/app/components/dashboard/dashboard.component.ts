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

  loading: boolean = false;
  // @ts-ignore
  file: File = null;

  constructor(
    public authService: AuthService,
    private http: HttpClient
  ) {}
  //
  ngOnInit(): void {

  }
  onChange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }
  onUpload() {
    console.log(this.file);
    if (this.file) {
      alert("Uploaded")
      // const reader = new FileReader();
      // reader.readAsText(this.file);
      // console.log(reader.result);
    } else {
      this.loading = !this.loading
      // alert("Please select a file first")
    }
  }

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
