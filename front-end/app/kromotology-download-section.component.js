System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var KromotologyDownloadSection;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            KromotologyDownloadSection = (function () {
                function KromotologyDownloadSection() {
                }
                KromotologyDownloadSection.prototype.getDataSVG = function () {
                    var size = 100;
                    var rowsLenght = 8;
                    var imgPadding = 30;
                    var margin = { 'top': 10, 'right': 10, 'bottom': 10, 'left': 10 };
                    var height = (size + imgPadding) * Math.ceil(this.data.success.length / rowsLenght);
                    var width = (size + imgPadding) * rowsLenght;
                    var chart = d3.select(".chart")
                        .attr("width", width)
                        .attr("height", height);
                    console.log(this.data.success);
                    var flag = chart.selectAll("g")
                        .data(this.data.success)
                        .enter().append("g")
                        .attr("transform", function (d, i) {
                        //Organize results in rows composed by "rowsLenght" elements
                        return "translate(" + (i % rowsLenght) * (size + imgPadding) + "," + Math.floor(i / rowsLenght) * (size + imgPadding) + ")";
                    })
                        .each(function (e, j) {
                        d3.select(this).selectAll('rect')
                            .data(function (d, i) { return d.clusters; })
                            .enter().append('rect')
                            .attr("x", function (d, i) { return d.totperc; })
                            .attr("y", 0)
                            .attr("height", size)
                            .attr("width", function (d, i) { return d.perc; })
                            .attr("fill", function (d) { return 'rgb(' + d.rgb[0] + ',' + d.rgb[1] + ',' + d.rgb[2] + ')'; });
                        d3.select(this).append("a")
                            .attr("xlink:href", function (d) { return d.url; })
                            .attr("target", "_blank")
                            .append("text")
                            .attr("x", size / 2)
                            .attr("y", size + (imgPadding * 0.6))
                            .attr("text-anchor", "middle")
                            .text(function () { return "id: " + j; });
                    });
                    var svgToSave = document.getElementById("svg-container").innerHTML;
                    var blob = new Blob([svgToSave], { type: 'data:image/svg+xml;charset=utf-8' });
                    saveAs(blob, this.appName + '-viz.svg');
                    document.getElementById("chart").innerHTML = "";
                };
                KromotologyDownloadSection.prototype.getDataTSV = function () {
                    console.log(this.data.success);
                    var csvtxt = 'id\timgUrl\twidth\theight\tcolorName\tpercentage\thexadecimal\n';
                    this.data.success.forEach(function (img, i) {
                        img.clusters.forEach(function (k) {
                            var hexString = d3.rgb(k.rgb[0], k.rgb[1], k.rgb[2]).toString();
                            csvtxt += (i + '\t' + img.url + '\t' + img.size.width + '\t' + img.size.height + '\t' + k.label + '\t' + k.perc + '\t' + hexString.toUpperCase() + '\n');
                        });
                    });
                    var blob = new Blob([csvtxt], { type: 'data:text/csv;charset=utf-8' });
                    saveAs(blob, this.appName + '-data.tsv');
                };
                KromotologyDownloadSection = __decorate([
                    core_1.Component({
                        selector: 'kromotology-download-section',
                        inputs: ['data', 'appName'],
                        styleUrls: ['./app/kromotology.css'],
                        template: "\n  <div class=\"row\">\n    <div id=\"svg-container\" class=\"col-xs-12\">\n      <svg id=\"chart\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" class=\"chart\"></svg>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"input-box col-xs-6\">\n      <button type=\"submit\" class=\"btn btn-default\" (click)=\"getDataSVG()\">Download SVG</button>\n    </div>\n    <div class=\"input-box col-xs-6\">\n      <button type=\"submit\" class=\"btn btn-default\" (click)=\"getDataTSV()\">Download TSV</button>\n    </div>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], KromotologyDownloadSection);
                return KromotologyDownloadSection;
            }());
            exports_1("KromotologyDownloadSection", KromotologyDownloadSection);
        }
    }
});
//# sourceMappingURL=kromotology-download-section.component.js.map