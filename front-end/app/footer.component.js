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
    var Footer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Footer = (function () {
                function Footer() {
                }
                Footer = __decorate([
                    core_1.Component({
                        selector: 'strumentalia-footer',
                        inputs: ['prjName'],
                        styles: ["\n    footer {\n      background-color: #4a4a4a;\n      color: white;\n      padding: 30px 0 60px;\n      border-top: 1px solid #a4a4a4;\n    }\n    h4 {\n      text-transform: uppercase;\n      letter-spacing: 1.5px;\n      font-size: 12px;\n      font-weight: 700;\n      padding: 0px;\n      margin-bottom: 20px;\n    }\n    /* strumentalia-footer h4::after {\n      content: '\u2014';\n      display: block;\n      padding: 8px 0 0 0;\n      font-weight: normal;\n      opacity: .5;\n    } */\n  "],
                        template: "<footer class=\"container-fluid\">\n  <div class=\"container\">\n      <div class=\"row\">\n          <div class=\"col-md-4 col-sm-4 col-xs-6\">\n            <h4>About the Project</h4>\n            <p>This tool is part of <a href=\"#\">{{prjName}}</a>, a collection of tools useful for doing research on the web.</p>\n          </div>\n\n          <div class=\"col-md-4 col-sm-4 col-xs-6\">\n            <h4>Credits</h4>\n            <p>A project by <a href=\"http://www.densitydesign.org\" target=\"_blank\">DensityDesign</a>.<br/>Source code available on<br class=\"visible-sm\" /> <a href=\"https://github.com/densitydesign\" target=\"_blank\">GitHub <i class=\"fa fa-github fa-1x\"></i></a>.</p>\n          </div>\n\n          <div class=\"col-md-2 col-sm-2 col-xs-6\">\n            <a href=\"http://www.densitydesign.org/\"><img class=\"img-responsive\" src=\"./app/img/density_logo.png\"></a>\n          </div>\n          <div class=\"col-md-2 col-sm-2 col-xs-6\">\n            <a href=\"http://www.dipartimentodesign.polimi.it/\"><img class=\"img-responsive\" src=\"./app/img/dip_logo.png\"></a>\n          </div>\n      </div>\n  </div>\n  </footer>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], Footer);
                return Footer;
            }());
            exports_1("Footer", Footer);
        }
    }
});
//# sourceMappingURL=footer.component.js.map