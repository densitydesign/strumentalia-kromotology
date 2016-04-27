System.register(['angular2/core', 'angular2/http', './download-section.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, download_section_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (download_section_component_1_1) {
                download_section_component_1 = download_section_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http) {
                    this.appName = "Kromotology";
                    this.sampleList = "http://memesvault.com/wp-content/uploads/Pokemon-Meme-Dat-Ash-04.png\nhttps://38.media.tumblr.com/avatar_a455f5f2e007_128.png";
                    this.mydata = { "success": [], "failed": [] };
                    this.listUrlRaw = [];
                    this.listUrl = [];
                    this.percentageDone = 0;
                    this.isDone = false;
                    this._baseUrl = "http://131.175.56.235:8080";
                    this._http = http;
                }
                AppComponent.prototype._getFullUrl = function (name) {
                    return this._baseUrl + name;
                };
                AppComponent.prototype.get = function (name, params) {
                    var _this = this;
                    var queryParams = params;
                    if (params && !(params instanceof http_1.URLSearchParams)) {
                        queryParams = new http_1.URLSearchParams();
                        for (var key in params) {
                            queryParams.set(key, params[key].toString());
                        }
                    }
                    return this._http.get(this._getFullUrl(name), { search: queryParams })
                        .subscribe(function (data) { return _this.temp = data; }, function (err) { return _this.logError(err); }, function () {
                        if (!_this.isDone) {
                            _this.mydata.success.push(JSON.parse(_this.temp._body));
                            console.log("failed", _this.mydata.failed.length, "success", _this.mydata.success.length);
                        }
                    });
                };
                AppComponent.prototype.logError = function (err) {
                    console.error(err);
                    if (!this.isDone) {
                        this.mydata.failed.push("error");
                    }
                };
                AppComponent.prototype.post = function (name, data, requestOptions) {
                    return this._http.post(this._getFullUrl(name), JSON.stringify(data), requestOptions).map(function (res) { return res.json(); });
                };
                AppComponent.prototype.resetForms = function () {
                    this.mydata = { "success": [], "failed": [] };
                    this.listUrlRaw = [];
                    this.listUrl = [];
                    this.isDone = false;
                };
                AppComponent.prototype.stopQueue = function () {
                    this.isDone = true;
                };
                AppComponent.prototype.getDataCSV = function () {
                    var csvtxt = 'id\timgUrl\tcolorName\tpercentage\thexadecimal\n';
                    this.mydata.success.forEach(function (img, i) {
                        img.clusters.forEach(function (k) {
                            var hexString = '#' + k.rgb[0].toString(16) + k.rgb[1].toString(16) + k.rgb[2].toString(16);
                            csvtxt += (i + '\t' + img.url + '\t' + k.label + '\t' + k.perc + '\t' + hexString.toUpperCase() + '\n');
                        });
                    });
                    var blob = new Blob([csvtxt], { type: 'data:text/csv;charset=utf-8' });
                    saveAs(blob, this.appName + '-data.tsv');
                };
                AppComponent.prototype.callKmean = function (imgUrl, k) {
                    this.isDone = false;
                    this.mydata = { "success": [], "failed": [] };
                    this.listUrlRaw = [];
                    this.listUrlRaw = imgUrl.split("\n");
                    for (var i = 0; i < this.listUrlRaw.length; i++) {
                        if (this.listUrlRaw[i] != "") {
                            if (this.listUrlRaw[i].indexOf('.svg') == -1) {
                                this.listUrl.push(this.listUrlRaw[i]);
                            }
                        }
                    }
                    console.log("Images to process:", this.listUrl.length);
                    for (var i = 0; i < this.listUrl.length; i++) {
                        this.get("/single", { img: this.listUrl[i], k: k });
                        this.percentageDone = 100 * this.mydata.success.length / this.listUrl.length;
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.component.html',
                        directives: [download_section_component_1.DownloadSection],
                        providers: [http_1.Http, http_1.HTTP_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//call this way
//http://131.175.56.235:8080/single/?img=http://www.gstatic.com/webp/gallery/2.jpg&k=5
//# sourceMappingURL=app.component.js.map