import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-knowledge-graph',
  templateUrl: './knowledge-graph.component.html',
  styleUrls: ['./knowledge-graph.component.css']
})
export class KnowledgeGraphComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) {}

  ngOnInit(): void {

  }
}
