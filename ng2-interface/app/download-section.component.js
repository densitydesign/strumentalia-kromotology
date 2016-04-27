System.register(['angular2/core'], function(exports_1) {
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
    var DownloadSection;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DownloadSection = (function () {
                function DownloadSection() {
                }
                DownloadSection.prototype.getDataSVG = function () {
                    var width = 500;
                    var height = 100;
                    var imgPadding = 30;
                    var margin = { 'top': 10, 'right': 10, 'bottom': 10, 'left': 10 };
                    var chart = d3.select(".chart")
                        .attr("width", width)
                        .attr("height", (height + imgPadding) * this.data.success.length);
                    console.log("data", this.data);
                    var flag = chart.selectAll("g")
                        .data(this.data.success)
                        .enter().append("g")
                        .attr("transform", function (d, i) {
                        return "translate(0," + i * (height + imgPadding) + ")";
                    })
                        .each(function (e, j) {
                        d3.select(this).selectAll('rect')
                            .data(function (d, i) { return d.clusters; })
                            .enter().append('rect')
                            .attr("x", function (d, i) { return d.totperc * (e.size.width / e.size.height); })
                            .attr("y", 0)
                            .attr("height", height)
                            .attr("width", function (d, i) { return d.perc * (e.size.width / e.size.height); })
                            .attr("fill", function (d) { return 'rgb(' + d.rgb[0] + ',' + d.rgb[1] + ',' + d.rgb[2] + ')'; });
                        d3.select(this).append("text")
                            .attr("x", 0)
                            .attr("y", 120)
                            .text(j);
                    });
                    var svgToSave = document.getElementById("svg-container").innerHTML;
                    var blob = new Blob([svgToSave], { type: 'data:image/svg+xml;charset=utf-8' });
                    saveAs(blob, this.appName + '-viz.svg');
                    document.getElementById("chart").innerHTML = "";
                };
                DownloadSection.prototype.getDataCSV = function () {
                    var csvtxt = 'id\timgUrl\tcolorName\tpercentage\thexadecimal\n';
                    this.data.success.forEach(function (img, i) {
                        img.clusters.forEach(function (k) {
                            var hexString = '#' + k.rgb[0].toString(16) + k.rgb[1].toString(16) + k.rgb[2].toString(16);
                            csvtxt += (i + '\t' + img.url + '\t' + k.label + '\t' + k.perc + '\t' + hexString.toUpperCase() + '\n');
                        });
                    });
                    var blob = new Blob([csvtxt], { type: 'data:text/csv;charset=utf-8' });
                    saveAs(blob, this.appName + '-data.tsv');
                };
                DownloadSection = __decorate([
                    core_1.Component({
                        selector: 'download-section',
                        inputs: ['data', 'appName'],
                        template: "\n  <div class=\"row\">\n    <div id=\"svg-container\" class=\"col-xs-12\">\n      <svg id=\"chart\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" class=\"chart\"></svg>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"input-box col-xs-6\">\n      <button type=\"submit\" class=\"btn btn-default\" (click)=\"getDataSVG()\">Download SVG</button>\n    </div>\n    <div class=\"input-box col-xs-6\">\n      <button type=\"submit\" class=\"btn btn-default\" (click)=\"getDataCSV()\">Download TSV</button>\n    </div>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], DownloadSection);
                return DownloadSection;
            })();
            exports_1("DownloadSection", DownloadSection);
        }
    }
});
//# sourceMappingURL=download-section.component.js.map