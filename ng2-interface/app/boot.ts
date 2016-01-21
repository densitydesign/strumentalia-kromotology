import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {Http,HTTP_BINDINGS,HTTP_PROVIDERS} from 'angular2/http';

//noinspection TypeScriptValidateTypes
bootstrap(AppComponent,[Http,HTTP_PROVIDERS]);
