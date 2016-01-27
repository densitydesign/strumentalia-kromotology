import {Component} from 'angular2/core'

@Component({
  selector: 'download-section',
  inputs: ['data','appName'],
  template: `
  <div class="row">
    <div id="svg-container" class="col-xs-12">
      <svg id="chart" xmlns="http://www.w3.org/2000/svg" version="1.1" class="chart"></svg>
    </div>
  </div>
  <div class="row">
    <div class="input-box col-xs-6">
      <button type="submit" class="btn btn-default" (click)="getDataSVG()">Download SVG</button>
    </div>
    <div class="input-box col-xs-6">
      <button type="submit" class="btn btn-default" (click)="getDataCSV()">Download TSV</button>
    </div>
  </div>`
})
export class DownloadSection {
  public data;

  getDataSVG(){
    var width = 500;
    var height = 100;
    var imgPadding = 30;
    var margin = {'top':10, 'right':10,'bottom':10,'left':10};

    var chart = d3.select(".chart")
      .attr("width", width)
      .attr("height", (height+imgPadding) * this.data.success.length);

    console.log("data",this.data);



    var flag = chart.selectAll("g")
        .data(this.data.success)
      .enter().append("g")
        .attr("transform", function(d, i) {
            return "translate(0," + i * (height+imgPadding) + ")";
        })
          .each(function(e,j){
            d3.select(this).selectAll('rect')
               .data(function (d, i) { return d.clusters; })
             .enter().append('rect')
               .attr("x", function(d, i) { return d.totperc*(e.size.width/e.size.height) } )
               .attr("y", 0)
               .attr("height", height)
               .attr("width", function (d,i) { return d.perc*(e.size.width/e.size.height) })
               .attr("fill", function(d) { return 'rgb('+ d.rgb[0] +','+ d.rgb[1] +','+ d.rgb[2] +')' })
            d3.select(this).append("text")
              .attr("x", 0)
              .attr("y", 120)
              .text(j)

           })

    var svgToSave = document.getElementById("svg-container").innerHTML;
    var blob = new Blob([svgToSave], { type: 'data:image/svg+xml;charset=utf-8' });
    saveAs(blob, this.appName + '-viz.svg');
    document.getElementById("chart").innerHTML = "";
  }

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
