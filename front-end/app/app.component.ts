import {Component} from 'angular2/core';
import {Http, URLSearchParams, RequestOptionsArgs, Headers, HTTP_BINDINGS,HTTP_PROVIDERS,  Response} from 'angular2/http';
import {NgStyle} from 'angular2/common';
import {Header} from './header.component';
import {Kromotology} from './kromotology.component';
import {Footer} from './footer.component';

@Component({
  selector: 'my-app',
  directives: [Header, Kromotology, Footer],
  providers: [Http,HTTP_PROVIDERS],
  template: `
  <strumentalia-header [prjName]="prjName"></strumentalia-header>

  <kromotology [prjName]="prjName"></kromotology>

  <strumentalia-footer [appName]=appName [appName]=appName [prjName]=prjName></strumentalia-footer>
  `
})
export class AppComponent {
  public prjName = "Strumentalia";
}
