import {Component} from 'angular2/core';
import {Http, URLSearchParams, RequestOptionsArgs, Headers, HTTP_BINDINGS,HTTP_PROVIDERS,  Response} from 'angular2/http';
import {NgStyle} from 'angular2/common';
import {DownloadSection} from './download-section.component';

@Component({
  selector: 'kromotology',
  inputs: ['prjName'],
  directives: [DownloadSection],
  providers: [Http,HTTP_PROVIDERS],
  styleUrls: ['./app/kromotology.css'],
  templateUrl: 'kromotology.component.html'
})
export class Kromotology {
  public appName = "Kromotology";
  public sampleList1 = `https://upload.wikimedia.org/wikipedia/commons/3/3e/Irises-Vincent_van_Gogh.jpg
https://upload.wikimedia.org/wikipedia/commons/0/02/Vincent_Van_Gogh_0020.jpg
https://upload.wikimedia.org/wikipedia/commons/f/f0/VanGogh-self-portrait-with_bandaged_ear.jpg
https://upload.wikimedia.org/wikipedia/commons/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg
https://upload.wikimedia.org/wikipedia/commons/3/32/Vincent_van_Gogh_-_National_Gallery_of_Art.JPG`;

  public sampleList2 = `http://th.downloadblog.it/u48QztiE8qcaL9rKzmRPQBQJJgc%253D/64x64/http://media.downloadblog.it/4/41b/periodo-di-prova-skyonline-03.jpg
http://th.downloadblog.it/excHTgW0MtmkOOZKK063ePOYWII%253D/64x64/http://media.downloadblog.it/5/526/periodo-di-prova-skyonline-01.jpg
http://th.downloadblog.it/-ArLlbKBxBWT-clTbdXJF3DVKXw%253D/64x64/http://media.downloadblog.it/f/fd8/periodo-di-prova-skyonline-04.jpg
http://www.fava-ivo.it/prod/img/MPG01.jpg
http://www.auto-repairtools.com/photo/pm10943885-tester_di_pressione_del_radiatore_dei_pc_degli_strumenti_di_prova_del_motore_21_e_tipo_corredo_di_vuoto_del_sistema_di_raffreddamento.jpg
http://www.bairoe.cn/photo/pm753021-servo_macchina_di_prova_universale_idraulica_hut_1000_prova_meccanica_in_tondo_esemplare_piano.jpg
http://www.bairoe.cn/photo/pm1336239-macchina_di_prova_universale_elettronica_controllata_da_computer_wdw_50_alta_precisione_prova_di_trazione.jpg
http://www.bairoe.cn/photo/pm1349799-servo_macchina_di_prova_universale_idraulica_hut_1000_prova_meccanica_in_tondo_esemplare_piano.jpg
http://www.faritalyshop.com/39-small_default/microtelefono-di-prova-batteria-locale-st230b.jpg
http://www.bairoe.cn/photo/pm755201-servo_macchina_di_prova_idraulica_del_taglio_yjw_10000_per_cuscinetto_di_gomma.jpg
http://www.fluke.com/NR/rdonlyres/21B22472-E120-457A-B663-DC8E7113FFD3/0/F_prv240_03c_39x39.jpg
http://www.auto-repairtools.com/photo/pm10943884-tester_di_pressione_del_radiatore_dei_pc_degli_strumenti_di_prova_del_motore_21_e_tipo_corredo_di_vuoto_del_sistema_di_raffreddamento.jpg
http://www.liyi-tech.com/photo/pm10538626-piatto_di_quadrante_elettrico_universale_della_macchina_di_prova_di_durezza_della_forza_della_prova_di_iniziale_10kg.jpg
http://www.liyi-tech.com/photo/pm10538624-piatto_di_quadrante_elettrico_universale_della_macchina_di_prova_di_durezza_della_forza_della_prova_di_iniziale_10kg.jpg
http://www.liyi-tech.com/photo/pm4217728-macchina_di_prova_universale_di_sforzo_di_trazione_di_larghezza_della_prova_di_400mm_per_plastica_gomma.jpg
http://www.testing-chambers.com/photo/pm10708212-macchina_di_prova_di_trazione_di_plastica_del_motore_a_corrente_alternata_1_kn_con_la_vite_della_palla_di_alta_precisione.jpg
http://www.faritalyshop.com/41-small_default/microtelefono-di-prova-fava-mpg01.jpg
http://theway.uidu.org/wp-content/uploads/2015/07/11666031_374233336108691_5858222005382009520_n-64x64.jpg
http://www.bairoe.cn/photo/pm1349796-servo_macchina_di_prova_universale_idraulica_hut_1000_prova_meccanica_in_tondo_esemplare_piano.jpg
`;

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

  getDataTSV() {
    var csvtxt = 'id\timgUrl\tcolorName\tpercentage\thexadecimal\n';
    this.mydata.success.forEach(function(img,i){
      img.clusters.forEach(function(k){
        var hexString = '#' + k.rgb[0].toString(16) + k.rgb[1].toString(16) + k.rgb[2].toString(16);
        csvtxt+=(i + '\t' + img.url +'\t'+ k.label +'\t'+ k.perc +'\t'+ hexString.toUpperCase() +'\n');
      })
    })
    var blob = new Blob([csvtxt], { type: 'data:text/csv;charset=utf-8' });
    saveAs(blob, this.appName + '-data.tsv');
  }

  checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  callKmean(imgUrl:string, k:number) {
      this.isDone = false;
      this.mydata = {"success":[],"failed":[]};
      this.listUrlRaw = [];
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
