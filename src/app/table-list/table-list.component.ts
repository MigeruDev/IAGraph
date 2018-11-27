import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})



export class TableListComponent implements OnInit {

  b = 0
  d = 0
  bd = 0
  bd2 = 0
  searchResult = {'BFS':{},
                  'DFS': {},
                  'IDDFS': {},
                  'UCS': {},
                  'BS': {}}

  heuristicSearchResult = {'HC':{},
                  'BestFS': {},
                  'A*': {},
                  'GS': {}}

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getComplexity();
    if (localStorage.getItem('searchResult')===null){
      
    }else{
      this.searchResult = JSON.parse(localStorage.getItem('searchResult')) 
    }
    if (localStorage.getItem('heuristicSearchResult')===null){
      
    }else{
      this.heuristicSearchResult = JSON.parse(localStorage.getItem('heuristicSearchResult'))
      
    }
  }

  getComplexity() {
    this.rest.getComplexity().subscribe((data: {}) => {
      console.log(data);
      this.b = data[0]['b'];
      this.d = data[0]['d'];
      this.bd = Math.pow(this.b,this.d)
      this.bd2 = Math.pow(this.b,this.d/2)
    });
  }

}
