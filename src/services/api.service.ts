import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppConfig } from './../config/app.config';

@Injectable()
export class APIService {

    constructor(private http: HttpClient) {
    }

    getRepos(params): Observable<any> {
        return this.http.get<any>(AppConfig.API_ENDPOINT + '/repos/' + params.owner + '/' + params.repo);
    }

    searchRepos(params): Observable<any> {
        return this.http.get<any>(AppConfig.API_ENDPOINT + '/search/repositories', { params });
    }
}
