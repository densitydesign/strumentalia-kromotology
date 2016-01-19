import {Component} from 'angular2/core';
import { Cluster } from './clusters.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {

  public callKmean = function(imgUrl, k){
    console.log(imgUrl,k);

  }

}
