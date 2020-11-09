import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'acme-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PeopleInfoFE';

  constructor(private router: Router){}

  ngOnInit(){
    this.router.navigateByUrl("/main");
  }
}
