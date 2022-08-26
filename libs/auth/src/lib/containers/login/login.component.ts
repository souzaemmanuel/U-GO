import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Authenticate } from '@u-go/models';
import { AuthService } from '@u-go/services';

@Component({
  selector: 'u-go-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  login(authenticate: Authenticate): void {
    this.authService.login(authenticate).subscribe();
  }
}
