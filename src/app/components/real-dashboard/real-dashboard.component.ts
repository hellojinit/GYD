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

  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }
}
