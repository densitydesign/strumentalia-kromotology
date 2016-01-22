import {Component} from 'angular2/core';
import {Http, URLSearchParams, RequestOptionsArgs, Headers, HTTP_BINDINGS,HTTP_PROVIDERS,  Response} from 'angular2/http';
import {NgStyle} from 'angular2/common';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
    providers:[Http,HTTP_PROVIDERS],
    styles:[`
    .color-cont{width:600px;}
    .color{height:15px; display:block;float:left;}
    `
    ]
})
export class AppComponent {
  public appName = "Kromotology"
     _http:Http;
    mydata = [];
    temp:{};

    constructor(http: Http) {
        this._http = http;
    }

    public _baseUrl:string = "http://131.175.56.235:8080";


    private _getFullUrl(name: string): string {
        return this._baseUrl + name;
    }

    get(name: string, params?: URLSearchParams | any): any {
        let queryParams = params;
        if(params && !(params instanceof URLSearchParams)) {
            queryParams = new URLSearchParams();
            for(let key in params) {
                queryParams.set(key, params[key].toString());
            }
        }
        return this._http.get(this._getFullUrl(name), {search: queryParams})
            //.map(res => res.json())
            .subscribe(
                data => this.temp = data,
                err => console.log(err),
                () => this.mydata.push(JSON.parse(this.temp._body))
            )
    }

    post(name: string, data: Object, requestOptions?: RequestOptionsArgs): any {
        return this._http.post(this._getFullUrl(name), JSON.stringify(data), requestOptions).map((res: any) => res.json());
    }

    callKmean(imgUrl:string, k:number) {
        var listUrl = imgUrl.split("\n");
        console.log(listUrl);
        for(var i=0; i<listUrl.length; i++) {
          if(listUrl[i] != "") {
            this.get("/single",{img:listUrl[i], k:k})
          } else {
            console.log(listUrl[i], "is not a url");
          }

        }

    }

}


//call this way
//http://131.175.56.235:8080/single/?img=http://www.gstatic.com/webp/gallery/2.jpg&k=5
