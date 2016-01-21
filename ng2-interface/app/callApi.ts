import {Injectable} from 'angular2/core';
import {URLSearchParams} from 'angular2/http';
import {BaseServer} from "./_baseServer";

// export interface IGitHubRequest {
//     per_page?: number;
//     page?: number;
// }
//
// export interface IRepoIssuesRequest extends IGitHubRequest{
//     state?: string;
//     updated?: string,
//     since?: string;
// }

@Injectable()
export class callApi {

    constructor(private _server: BaseServer){

    }

    getKolors(imgUrl, k){
        return this._server.get(`/single/`, {img: imgUrl, k:k});
    }
}
