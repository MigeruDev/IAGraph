import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {

  @Input() search = {start:0, goal:0, search:''};
  
  heuristicSearchResult = {'HC':{},
                  'BestFS': {},
                  'A*': {},
                  'GS': {}}

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('heuristicSearchResult')===null){
      
    }else{
      this.heuristicSearchResult = JSON.parse(localStorage.getItem('heuristicSearchResult'))
      
    }
  }

  heuristicSearch(algorithm: string) {
    this.search['search'] = algorithm
    this.rest.heuristicSearch(this.search).subscribe((result) => {
      
      this.heuristicSearchResult[algorithm] = result
      localStorage.setItem('heuristicSearchResult', JSON.stringify(this.heuristicSearchResult))
    }, (err) => {
      console.log(err);
    });
  }

}
