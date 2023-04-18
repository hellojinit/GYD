import {Component, OnInit, Renderer2, ElementRef} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
declare var particlesJS: any;

// import {AnimationOptions} from "ngx-lottie";
// import {AnimationItem} from "lottie-web";

// declare function pJS(): void;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // myScriptElement1: HTMLScriptElement;
  // myScriptElement2: HTMLScriptElement;
  constructor(
    public authService: AuthService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    // pJS();
  }
  // // This is the option that uses the package's AnimationOption interface
  // options: AnimationOptions = {
  //   path: '/assets/lottie/graph.json'
  // };

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/particles.json', function() {
      console.log('callback - particles.js config loaded');
    });
    // const scriptElement1 = this.renderer.createElement('script');
    // this.renderer.setAttribute(scriptElement1, 'src', 'helper/particles/particles.js');
    // this.renderer.appendChild(this.el.nativeElement, scriptElement1);
    //
    // // Create script element 2
    // const scriptElement2 = this.renderer.createElement('script');
    // this.renderer.setAttribute(scriptElement2, 'src', 'helper/particles/helper.js');
    // this.renderer.appendChild(this.el.nativeElement, scriptElement2);
  }

  //
  //
  // // This is the component function that binds to the animationCreated event from the package
  // onAnimate(animationItem: AnimationItem): void {
  //   console.log(animationItem);
  //   // animationItem.stop();
  // }
}





