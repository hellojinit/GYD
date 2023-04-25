import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
declare var particlesJS: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  constructor(
    public authService: AuthService
    // public iconSet: IconSetService
  ) {}

  ngOnInit(): void {
    //
    // const video = this.renderer.createElement('video');
    //
    // // Set the video source URL
    // this.renderer.setAttribute(video, 'src', './assets/dashDemo.mov');
    //
    // // Set other video attributes
    // this.renderer.setAttribute(video, 'autoplay', '');
    // this.renderer.setAttribute(video, 'muted', '');
    // this.renderer.setAttribute(video, 'loop', '');
    // this.renderer.setStyle(video, 'width', '50vw');
    // this.renderer.setStyle(video, 'width', '50vw');
    // // Append the video element to the component's native element
    // this.renderer.appendChild(this.el.nativeElement, video);

    particlesJS.load('particles-js', 'assets/particles.json', function () {
      console.log('callback - particles.js config loaded');
    });
    window.addEventListener('scroll', function() {
      const scrollDownArrow = document.getElementById('scroll-down-arrow');
      if (scrollDownArrow && window.scrollY > 0) {
        scrollDownArrow.style.display = 'none';
      } else {
        if (scrollDownArrow != null) {
          scrollDownArrow.style.display = 'block';
        }
      }
    });
  }


}



// // This is the option that uses the package's AnimationOption interface
// options: AnimationOptions = {
//   path: '/assets/lottie/graph.json'
// };
