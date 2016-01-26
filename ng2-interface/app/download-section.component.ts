import {Component} from 'angular2/core'

@Component({
  selector: 'download-section',
  inputs: ['data','appName'],
  template: `
  <div class="row">
    <div class="input-box col-xs-6">
      <button type="submit" class="btn btn-default" disabled>Download SVG</button>
    </div>
    <div class="input-box col-xs-6">
      <button type="submit" class="btn btn-default" (click)="getDataCSV()">Download CSV</button>
    </div>
  </div>`
})
export class DownloadSection {
  public data;

  getDataCSV() {
    var csvtxt = 'id\timgUrl\tcolorName\tpercentage\thexadecimal\n';
    this.data.success.forEach(function(img,i){
      img.clusters.forEach(function(k){
        var hexString = '#' + k.rgb[0].toString(16) + k.rgb[1].toString(16) + k.rgb[2].toString(16);
        csvtxt+=(i + '\t' + img.url +'\t'+ k.label +'\t'+ k.perc +'\t'+ hexString.toUpperCase() +'\n');
      })
    })
    var blob = new Blob([csvtxt], { type: 'data:text/csv;charset=utf-8' });
    saveAs(blob, this.appName + '-data.tsv');
  }
}
