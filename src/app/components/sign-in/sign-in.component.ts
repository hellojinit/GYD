import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }
}
