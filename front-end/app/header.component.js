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
    var Header;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Header = (function () {
                function Header() {
                }
                Header = __decorate([
                    core_1.Component({
                        selector: 'strumentalia-header',
                        inputs: ['prjName'],
                        styles: ["\n    header {\n      background-color: #4a4a4a;\n    }\n    .navbar-inverse {\n        background-color: #4a4a4a;\n        border-color: #333;\n    }\n    h2 {\n      font-size: 18px;\n      font-weight: 600;\n      letter-spacing: 2px;\n      color: #fff;\n      text-transform: uppercase;\n      margin: auto;\n    }\n    .nav a {\n      font-weight: 600;\n      letter-spacing: 2px;\n      text-transform: uppercase;\n      font-size: 12px;\n    }\n    a>i {\n      font-size:16px;\n    }\n  "],
                        template: "<header>\n    <nav class=\"navbar navbar-inverse navbar-fixed-top\">\n      <div class=\"container\">\n        <div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n          <a class=\"navbar-brand\" href=\"#\"><h2>{{prjName}}</h2></a>\n        </div>\n        <div id=\"navbar\" class=\"collapse navbar-collapse\">\n          <ul class=\"nav navbar-nav\">\n          </ul>\n          <ul class=\"nav navbar-nav navbar-right\">\n            <li><a href=\"#\">About</a></li>\n          </ul>\n        </div><!--/.nav-collapse -->\n      </div>\n    </nav>\n  </header>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], Header);
                return Header;
            }());
            exports_1("Header", Header);
        }
    }
});
//# sourceMappingURL=header.component.js.map