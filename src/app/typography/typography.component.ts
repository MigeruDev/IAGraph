import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { local } from 'd3';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})


export class TypographyComponent implements OnInit {
  panelOpenState = false;
  
  @Input() search = {start:0, goal:0, search:''};
  
  searchResult = {'BFS':{},
                  'DFS': {},
                  'IDDFS': {},
                  'UCS': {},
                  'BS': {}}

  
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('searchResult')===null){
      
    }else{
      this.searchResult = JSON.parse(localStorage.getItem('searchResult'))
      
    }
  }
  
  blindSearch(algorithm: string) {
    this.search['search'] = algorithm
    this.rest.blindSearch(this.search).subscribe((result) => {
      
      this.searchResult[algorithm] = result
      localStorage.setItem('searchResult', JSON.stringify(this.searchResult))
    }, (err) => {
      console.log(err);
    });
  }
  
}
