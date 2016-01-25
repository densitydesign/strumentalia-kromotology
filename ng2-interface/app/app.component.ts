import {Component} from 'angular2/core';
import {Http, URLSearchParams, RequestOptionsArgs, Headers, HTTP_BINDINGS,HTTP_PROVIDERS,  Response} from 'angular2/http';
import {NgStyle} from 'angular2/common';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
    providers:[Http,HTTP_PROVIDERS]
})
export class AppComponent {
  public appName = "Kromotology"
  _http:Http;
  mydata = [];
  temp:{};
  listUrlRaw = [];
  listUrl = [];
  percentageDone = 0;

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

  resetForms() {
    this.mydata = [];
    this.listUrlRaw = [];
    this.listUrl = [];
    //imgUrl.value = "";
  }

  getDataCSV() {
    console.log(this.mydata);
    var csvtxt = 'id\timgUrl\tcolorName\tpercentage\thexadecimal\n';
    this.mydata.forEach(function(img,i){
      img.clusters.forEach(function(k){
        var hexString = '#' + k.rgb[0].toString(16) + k.rgb[1].toString(16) + k.rgb[2].toString(16);
        csvtxt+=(i + '\t' + img.url +'\t'+ k.label +'\t'+ k.perc +'\t'+ hexString.toUpperCase() +'\n');
      })
    })
    var blob = new Blob([csvtxt], { type: 'data:text/csv;charset=utf-8' });
            saveAs(blob, 'seealsology-data.tsv');
  }

  callKmean(imgUrl:string, k:number) {
      this.mydata = [];
      this.listUrlRaw = [];
      this.listUrlRaw = imgUrl.split("\n");
      for(var i=0; i<this.listUrlRaw.length; i++) {
        if(this.listUrlRaw[i] != "") {
          this.listUrl.push(this.listUrlRaw[i])
        }
      }
      console.log(this.listUrl);
      for(var i=0; i<this.listUrl.length; i++) {
        if(this.listUrl[i] != "") {
          this.get("/single",{img:this.listUrl[i], k:k})
          this.percentageDone = 100*this.mydata.length/this.listUrl.length;
          window.scrollTo(0, document.body.scrollHeight);
        } else {
          console.log(this.listUrl[i], "is not a url");
        }
      }
  }

}


//call this way
//http://131.175.56.235:8080/single/?img=http://www.gstatic.com/webp/gallery/2.jpg&k=5
