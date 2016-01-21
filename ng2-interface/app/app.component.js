System.register(['angular2/core', 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http) {
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
                        .subscribe(function (data) { return _this.mydata = data; }, function (err) { return console.log(err); }, function () { return _this.mydata = JSON.parse(_this.mydata._body); });
                };
                AppComponent.prototype.post = function (name, data, requestOptions) {
                    return this._http.post(this._getFullUrl(name), JSON.stringify(data), requestOptions).map(function (res) { return res.json(); });
                };
                AppComponent.prototype.callKmean = function (imgUrl, k) {
                    this.get("/single", { img: imgUrl, k: k });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.component.html',
                        providers: [http_1.Http, http_1.HTTP_PROVIDERS],
                        styles: ["\n    .color-cont{width:600px;}\n    .color{height:15px; display:block;float:left;}\n    "
                        ]
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