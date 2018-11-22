import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})


export class TypographyComponent implements OnInit {
  panelOpenState = false;
  
  @Input() search = {start:0, goal:0, search:''};
  
  searchResult = {}

  
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
  }
  
  blindSearch(algorithm: string) {
    this.search['search'] = algorithm
    this.rest.blindSearch(this.search).subscribe((result) => {
      
      this.searchResult = result
    }, (err) => {
      console.log(err);
    });
  }
  
}
