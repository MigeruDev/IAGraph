import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as d3 from 'd3';

interface Node {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface Graph {
  nodes: Node[];
  links: Link[];
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class UserProfileComponent implements OnInit {

  nodes:any = [];

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getNodes();
    console.log('D3.js version:', d3['version']);

    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id))
      .force('charge', d3.forceManyBody())
      .force('collide', d3.forceCollide((d: any) =>  d.id === "j" ? 90 : 40 ))
      .force('center', d3.forceCenter(width / 2, height / 2));

    /*.force('collide', d3.forceCollide((d: any) =>  d.id === "j" ? 100 : 50 )) */

    d3.json('assets/miserables.json').
      then((data: any) => {
        const nodes: Node[] = [];
        const links: Link[] = [];

        data.nodes.forEach((d) => {
          nodes.push(<Node>d);
        });

        data.links.forEach((d) => {
          links.push(<Link>d);
        });

        const graph: Graph = <Graph>{ nodes, links };

        const link = svg.append('g')
          .attr('class', 'links')
          .selectAll('line')
          .data(graph.links)
          .enter()
          .append('line')
          .attr('stroke-width', (d: any) => Math.sqrt(d.value));

        const node = svg.append('g')
          .attr('class', 'nodes')
          .selectAll('circle')
          .data(graph.nodes)
          .enter()
          .append('circle')
          .attr('r', (d: any) => 1.5*d.group + 5)
          .attr('fill', (d: any) => color(d.group));



        /*const lables = node.append("text")
          .text((d) => d.id)
          .attr('x', 6)
          .attr('y', 3);*/

        svg.selectAll('circle').call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
        );

        const textElements = svg.append('g')
        .selectAll('text')
        .data(graph.nodes)
        .enter().append('text')
          .text(node => node.id)
          .attr('font-size', 15)
          .attr('dx', 15)
          .attr('dy', 4)

        node.append('title')
          .text((d) => d.id);

        simulation
          .nodes(graph.nodes)
          .on('tick', ticked);

        simulation.force<d3.ForceLink<any, any>>('link')
          .links(graph.links);

        function ticked() {
          link
            .attr('x1', function(d: any) { return d.source.x; })
            .attr('y1', function(d: any) { return d.source.y; })
            .attr('x2', function(d: any) { return d.target.x; })
            .attr('y2', function(d: any) { return d.target.y; });

          node
            .attr('cx', function(d: any) { return d.x; })
            .attr('cy', function(d: any) { return d.y; });
          textElements
            .attr('x', function(d: any) { return d.x; })
            .attr('y', function(d: any) { return d.y; });
        }
      })
      .catch((err) => {
        throw new Error('Bad data file!'); 
      });

    function dragstarted(d) {
      if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) { simulation.alphaTarget(0); }
      d.fx = null;
      d.fy = null;
    }
  }

  getNodes() {
    this.nodes = [];
    this.rest.getNodes().subscribe((data: {}) => {
      console.log(data);
      this.nodes = data;
    });
  }

}
