import { Component } from '@angular/core';
import 'rxjs/add/operator/filter';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './modules/user/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _loading: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public auth: AuthenticationService) {

    //Subscribe to router events, whenever route is changing show loading
    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe(() => {
        this._loading = true;
      });

    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        this._loading = false;
      })
  }

  ngOnInit() {
  }

  //Go home or survey, checks if user is logged in
  goHome() {
    if (this.auth.user$.value) {
      this.router.navigate(['/survey']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  get loading(): boolean {
    return this._loading;
  }

}
