import {Component} from 'angular2/core'

@Component({
  selector: 'strumentalia-header',
  inputs: ['prjName'],
  styles: [`
    header {
      background-color: #4a4a4a;
    }
    .navbar-inverse {
        background-color: #4a4a4a;
        border-color: #333;
    }
    h2 {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 2px;
      color: #fff;
      text-transform: uppercase;
      margin: auto;
    }
    .nav a {
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-size: 12px;
    }
    a>i {
      font-size:16px;
    }
  `],
  template: `<header>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><h2>{{prjName}}</h2></a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="actives"><a href="#">Kromotology</a></li>
            <li><a href="#">Seealsology</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">About</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
  </header>`
})
export class Header {

}
