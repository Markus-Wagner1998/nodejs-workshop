import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth/auth.config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    const url =
      'http://localhost:8999/realms/workshop/.well-known/openid-configuration';
    this.oauthService.loadDiscoveryDocument(url).then(() => {
      // This method just tries to parse the token(s) within the url when
      // the auth-server redirects the user back to the web-app
      // It dosn't send the user the the login page
      this.oauthService.tryLogin({});
    });
  }
}
