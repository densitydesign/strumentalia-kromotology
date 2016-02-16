import {Component} from 'angular2/core'

@Component({
  selector: 'kromotology-download-section',
  inputs: ['data','appName'],
  styleUrls: ['./app/kromotology.css'],
  template: `
  <div class="row">
    <div id="svg-container" class="col-xs-12">
      <svg id="chart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="chart"></svg>
    </div>
  </div>
  <div class="row">
    <div class="input-box col-xs-6">
      <button type="submit" class="btn btn-default" (click)="getDataSVG()">Download SVG</button>
    </div>
    <div class="input-box col-xs-6">
      <button type="submit" class="btn btn-default" (click)="getDataTSV()">Download TSV</button>
    </div>
  </div>`
})
export class KromotologyDownloadSection {
  public data;

  getDataSVG(){
    var size = 100;
    var rowsLenght = 8;
    var imgPadding = 30;
    var margin = {'top':10, 'right':10,'bottom':10,'left':10};
    var height = (size+imgPadding) * Math.ceil(this.data.success.length/rowsLenght);
    var width = (size+imgPadding)*rowsLenght;

    var chart = d3.select(".chart")
      .attr("width", width)
      .attr("height", height;

    console.log(this.data.success)

    var flag = chart.selectAll("g")
        .data(this.data.success)
      .enter().append("g")
        .attr("transform", function(d, i) {
            //Organize results in rows composed by "rowsLenght" elements
            return "translate(" + (i%rowsLenght)*(size+imgPadding) + "," + Math.floor(i/rowsLenght) * (size+imgPadding) + ")";
        })
          .each(function(e,j){
            d3.select(this).selectAll('rect')
               .data(function (d, i) { return d.clusters; })
             .enter().append('rect')
               .attr("x", function(d, i) { return d.totperc } )
               .attr("y", 0)
               .attr("height", size)
               .attr("width", function(d,i) { return d.perc })
               .attr("fill", function(d) { return 'rgb('+ d.rgb[0] +','+ d.rgb[1] +','+ d.rgb[2] +')' })

            d3.select(this).append("a")
              .attr("xlink:href", function(d) { return d.url; })
              .attr("target", "_blank")
              .append("text")
                .attr("x", size/2)
                .attr("y", size+(imgPadding*0.6))
                .attr("text-anchor", "middle")
                .text(function() { return "id: " + j})

           })

    var svgToSave = document.getElementById("svg-container").innerHTML;
    var blob = new Blob([svgToSave], { type: 'data:image/svg+xml;charset=utf-8' });
    saveAs(blob, this.appName + '-viz.svg');
    document.getElementById("chart").innerHTML = "";
  }

  getDataTSV() {
    console.log(this.data.success)
    var csvtxt = 'id\timgUrl\twidth\theight\tcolorName\tpercentage\thexadecimal\n';
    this.data.success.forEach(function(img,i){
      img.clusters.forEach(function(k){
        var hexString = d3.rgb(k.rgb[0],k.rgb[1],k.rgb[2]).toString();
        csvtxt+=(i + '\t' + img.url + '\t' + img.size.width + '\t' + img.size.height +'\t'+ k.label +'\t'+ k.perc +'\t'+ hexString.toUpperCase() +'\n');
      })
    })
    var blob = new Blob([csvtxt], { type: 'data:text/csv;charset=utf-8' });
    saveAs(blob, this.appName + '-data.tsv');
  }
}
