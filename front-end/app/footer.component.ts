import {Component} from 'angular2/core'

@Component({
  selector: 'strumentalia-footer',
  inputs: ['prjName'],
  styles: [`
    footer {
      background-color: #4a4a4a;
      color: white;
      padding: 30px 0 60px;
      border-top: 1px solid #a4a4a4;
    }
    h4 {
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-size: 12px;
      font-weight: 700;
      padding: 0px;
      margin-bottom: 20px;
    }
    /* strumentalia-footer h4::after {
      content: '—';
      display: block;
      padding: 8px 0 0 0;
      font-weight: normal;
      opacity: .5;
    } */
  `],
  template: `<footer class="container-fluid">
  <div class="container">
      <div class="row">
          <div class="col-md-4 col-sm-4 col-xs-6">
            <h4>About the Project</h4>
            <p>This tool is part of <a href="#">{{prjName}}</a>, a collection of tools useful for doing research on the web.</p>
          </div>

          <div class="col-md-4 col-sm-4 col-xs-6">
            <h4>Credits</h4>
            <p>A project by <a href="http://www.densitydesign.org" target="_blank">DensityDesign</a>.<br/>Source code available on<br class="visible-sm" /> <a href="https://github.com/densitydesign" target="_blank">GitHub <i class="fa fa-github fa-1x"></i></a>.</p>
          </div>

          <div class="col-md-2 col-sm-2 col-xs-6">
            <a href="http://www.densitydesign.org/"><img class="img-responsive" src="./app/img/density_logo.png"></a>
          </div>
          <div class="col-md-2 col-sm-2 col-xs-6">
            <a href="http://www.dipartimentodesign.polimi.it/"><img class="img-responsive" src="./app/img/dip_logo.png"></a>
          </div>
      </div>
  </div>
  </footer>`
})
export class Footer {

}
