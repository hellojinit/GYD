import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Network, DataSet, Node, Edge } from 'vis-network/standalone/esm/vis-network';
import html2canvas from 'html2canvas'; // Import html2canvas library

import { AuthService } from '../../shared/services/auth.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-knowledge-graph',
  templateUrl: './knowledge-graph.component.html',
  styleUrls: ['./knowledge-graph.component.css']
})
export class KnowledgeGraphComponent implements OnInit {

  @ViewChild('networkContainer', {static: true}) networkContainer: ElementRef | undefined;
  relationsData = {
      "relations":[{"head":"Alan Mathison Turing","meta":{"spans":[[0,128]]},"tail":"FRS","type":"award received"},{"head":"Alan Mathison Turing","meta":{"spans":[[0,128]]},"tail":"23 June 1912","type":"date of birth"},{"head":"Alan Mathison Turing","meta":{"spans":[[0,128]]},"tail":"7 June 1954","type":"date of death"},{"head":"Alan Mathison Turing","meta":{"spans":[[0,128]]},"tail":"computer scientist","type":"occupation"},{"head":"Alan Mathison Turing","meta":{"spans":[[0,128]]},"tail":"Maida Vale","type":"place of birth"},{"head":"Alan Mathison Turing","meta":{"spans":[[0,128]]},"tail":"London","type":"place of birth"},{"head":"FRS","meta":{"spans":[[0,128]]},"tail":"London","type":"location"},{"head":"English","meta":{"spans":[[0,128]]},"tail":"London","type":"capital"},{"head":"computer scientist","meta":{"spans":[[0,128]]},"tail":"computer scientist","type":"subclass of"},{"head":"artificial intelligence","meta":{"spans":[[0,128]]},"tail":"computer science","type":"part of"},{"head":"Alan Mathison Turing","meta":{"spans":[[0,128]]},"tail":"FRS","type":"member of"},{"head":"Maida Vale","meta":{"spans":[[0,128]]},"tail":"London","type":"located in the administrative territorial entity"},{"head":"Department of Mathematics","meta":{"spans":[[110,238]]},"tail":"Princeton University","type":"part of"},{"head":"theoretical computer science","meta":{"spans":[[110,238]]},"tail":"artificial intelligence","type":"has part"},{"head":"artificial intelligence","meta":{"spans":[[110,238]]},"tail":"theoretical computer science","type":"part of"},{"head":"Government Code and Cypher School","meta":{"spans":[[110,238]]},"tail":"Bletchley Park","type":"location"},{"head":"Hut 8","meta":{"spans":[[220,348]]},"tail":"Bletchley Park","type":"part of"},{"head":"Hut 8","meta":{"spans":[[220,348]]},"tail":"Bletchley Park","type":"location"},{"head":"Hut 8","meta":{"spans":[[220,348]]},"tail":"Government Code and Cypher School","type":"part of"}]
  };
  network: Network | undefined;

  constructor(
    public authService: AuthService,
    private renderer: Renderer2,
    private el: ElementRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      const data = params['data'];
      // Use the retrieved data in your component logic
      console.log('Data from query parameters:', data);
    });
    const nodes = new DataSet<Node>();
    const edges = new DataSet<Edge>();

    // Add nodes and edges from relation data
    this.relationsData.relations.forEach(relation => {
      if (!nodes.get(relation.head)) {
        nodes.add({id: relation.head, label: relation.head, color: {border: this.getRandomColor(), background: "white"} });
      }
      if (!nodes.get(relation.tail)) {
        nodes.add({id: relation.tail, label: relation.tail, color: {border: this.getRandomColor(), background: "white"} });
      }
      // Check if the edge already exists in the dataset before adding
      if (!edges.get(relation.head + '-' + relation.tail)) {
        edges.add({id: relation.head + '-' + relation.tail, from: relation.head, to: relation.tail, label: relation.type});
      }
    });

    // Set up the options for the network visualization
    const options = {
      nodes: {
        shape: "dot",
        size: 32,
        font: {
          size: 24,
          color: "black"
        },
        borderWidth: 5,
        // borderWidthSelected: 8,
        // size: 24,
        color: {
          border: "white",
          background: "black",
          // highlight: {
          //   border: "black",
          //   background: "white",
          // },
          hover: {
            border: "black",
            background: "DarkOrchid"
          },
        },
      },
      edges: {
        width: 4,
        color: "white",
        font: {
          size: 16,
          strokeColor: "transparent",
          color: "black"
        }
      },
      interaction: {
        hover: true
      },
      physics: {
        enabled: true,
        repulsion: {
          centralGravity: 0.2,
          damping: 0.09,
          nodeDistance: 200,
          springConstant: 0.05,
          springLength: 200
        },
        solver: "repulsion",
        stabilization: {
          enabled: true,
          fit: true,
          iterations: 1000,
          onlyDynamicEdges: false,
          updateInterval: 50
        }
      }
    };

    // Create a new instance of the network visualization
    // const container = this.networkContainer.nativeElement;

    // @ts-ignore
    const container = this.networkContainer.nativeElement;
    this.network = new Network(container, {nodes, edges}, options);
    this.renderer.setStyle(container, 'height', '95vh');
    this.renderer.setStyle(container, 'align-items', 'center');
    this.renderer.setStyle(container, 'width', '100vw');
    this.renderer.setStyle(container, 'border', 'white');
    this.renderer.setStyle(container, 'background', '#c9c8c8');
  }

  getRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  saveAsImage() {
    // @ts-ignore
    const container = this.networkContainer.nativeElement;
    html2canvas(container).then(canvas => {
      // Convert canvas to image data URL
      const imgDataUrl = canvas.toDataURL('image/png');

      // Create a link element to download the image
      const link = document.createElement('a');
      link.href = imgDataUrl;
      link.download = 'graph.png';
      link.click();
    });
  }

}
