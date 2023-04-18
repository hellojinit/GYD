import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
declare var particlesJS: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/particles.json', function () {
      console.log('callback - particles.js config loaded');
    });
  }
}


// // This is the option that uses the package's AnimationOption interface
// options: AnimationOptions = {
//   path: '/assets/lottie/graph.json'
// };
