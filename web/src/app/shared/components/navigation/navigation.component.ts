import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/users/services/user.service';
import { User } from 'src/app/users/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @Input() title: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  user$: Observable<User>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private userService: UserService
    ) {
      this.user$ = this.userService.getUser();
    }

  logout(): void {
    this.userService.logout();
  }
}
