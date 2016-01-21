import {Component} from 'angular2/core';
  import {Http} from 'angular2/http';
  import {BaseServer} from './_baseServer';
  import {callApi} from './callApi'

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {

  public api = new callApi(new BaseServer("http://131.175.56.235:8080"))

  public callKmean = function(imgUrl, k){
    console.log(imgUrl,k);

  }



}


//call this way
//http://131.175.56.235:8080/single/?img=http://www.gstatic.com/webp/gallery/2.jpg&k=5
  
