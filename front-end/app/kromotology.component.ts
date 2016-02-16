import {Component, OnInit} from 'angular2/core';
import {Http, URLSearchParams, RequestOptionsArgs, Headers, HTTP_BINDINGS,HTTP_PROVIDERS,  Response} from 'angular2/http';
import {NgStyle} from 'angular2/common';
import {KromotologyDownloadSection} from './kromotology-download-section.component';
import {mockList1,mockList2,mockList3} from './mock-data';

@Component({
  selector: 'kromotology',
  inputs: ['prjName'],
  directives: [KromotologyDownloadSection],
  providers: [Http,HTTP_PROVIDERS],
  styleUrls: ['./app/kromotology.css'],
  templateUrl: './app/kromotology.component.html'
})
export class Kromotology implements OnInit{
  public appName = "Kromotology";
  public sampleList:string;
  ngOnInit(){
    this.sampleList = mockList2;
  }

  _http:Http;
  mydata = {"success":[],"failed":[]};
  temp:{};
  listUrlRaw = [];
  listUrl = [];
  percentageDone = 0;
  public isDone: boolean = false;
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
              err => this.logError(err),
              () => {
                if (!this.isDone) {
                  this.mydata.success.push(JSON.parse(this.temp._body));
                  console.log("failed",this.mydata.failed.length,"success",this.mydata.success.length);
                }
              }
          )
  }

  logError(err) {
    console.error(err);
    if (!this.isDone) {
      this.mydata.failed.push("error");
    }
  }

  post(name: string, data: Object, requestOptions?: RequestOptionsArgs): any {
      return this._http.post(this._getFullUrl(name), JSON.stringify(data), requestOptions).map((res: any) => res.json());
  }

  resetForms() {
    this.mydata = {"success":[],"failed":[]};
    this.listUrlRaw = [];
    this.listUrl = [];
    this.isDone = false;
  }

  stopQueue() {
    this.isDone = true;
  }

  // getDataTSV() {
  //   var csvtxt = 'id\timgUrl\tcolorName\tpercentage\thexadecimal\n';
  //   this.mydata.success.forEach(function(img,i){
  //     img.clusters.forEach(function(k){
  //       var hexString = '#' + k.rgb[0].toString(16) + k.rgb[1].toString(16) + k.rgb[2].toString(16);
  //       csvtxt+=(i + '\t' + img.url +'\t'+ k.label +'\t'+ k.perc +'\t'+ hexString.toUpperCase() +'\n');
  //     })
  //   })
  //   var blob = new Blob([csvtxt], { type: 'data:text/csv;charset=utf-8' });
  //   saveAs(blob, this.appName + '-data.tsv');
  // }

  checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  callKmean(imgUrl:string, k:number) {
      this.resetForms();
      this.listUrlRaw = imgUrl.split("\n");

      for(var i=0; i<this.listUrlRaw.length; i++) {
        if(this.checkURL(this.listUrlRaw[i])) { this.listUrl.push(this.listUrlRaw[i]) }
      }
      console.log("Images to process:",this.listUrl.length);

      for(var i=0; i<this.listUrl.length; i++) {
        this.get("/single",{img:this.listUrl[i], k:k})
        this.percentageDone = 100*this.mydata.success.length/this.listUrl.length;
      }

  }

} //closes Kromotology


//call this way
//http://131.175.56.235:8080/single/?img=http://www.gstatic.com/webp/gallery/2.jpg&k=5
