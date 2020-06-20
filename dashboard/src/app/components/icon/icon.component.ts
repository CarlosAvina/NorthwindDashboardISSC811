import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  constructor(public router: Router) { }

  logOut(): void {
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }

}
