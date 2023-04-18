import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) {}

  // This is the option that uses the package's AnimationOption interface
  options: AnimationOptions = {
    path: '/assets/lottie/graph.json'
  };

  ngOnInit(): void {

  }



  // This is the component function that binds to the animationCreated event from the package
  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
    // animationItem.stop();
  }
}





