import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../user/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthenticationService,
  private router:Router) { }

  ngOnInit() {
    if(this.auth.user$.value) {
      this.router.navigate(['/survey'])
    }
  }

}
