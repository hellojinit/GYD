import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";


@Component({
  selector: 'app-real-dashboard',
  templateUrl: './real-dashboard.component.html',
  styleUrls: ['./real-dashboard.component.css']
})
export class RealDashboardComponent {


  slides: any[] = new Array(2).fill({id: -1, src: '', title: '', subtitle: ''});
  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: './assets/text-sum.png',
      title: 'Text Summarization',
      subtitle: 'Upload, write, or paste any text and GYD will summarize it in moments.'
    };
    this.slides[1] = {
      id: 1,
      src: './assets/KG.png',
      title: 'Knowledge Graph',
      subtitle: 'Upload, write, or paste any text and GYD will give you a knowledge graph.'
    }
    // this.slides[2] = {
    //   id: 2,
    //   src: './assets/KG.png',
    //   title: 'Q & A',
    //   subtitle: 'Discover GYD\'s new feature to answer your questions.'
    // }
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }
}
