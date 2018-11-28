import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

interface PaginationRequest {
  currentPage: string;
  itemsPerPage: string;
  sortFieldName: string;
  sSortDir_0: string;
  sSearch: string;
  sEcho: number;
}

@Injectable()
export class Rest {

  public API_URL = 'http://localhost:8080';

  config: PaginationRequest = {
    currentPage: '1',
    itemsPerPage: '5',
    sortFieldName: 'name',
    sSortDir_0: 'asc',
    sSearch: '',
    sEcho: 0
  };

  constructor(public http: HttpClient) {
  }

  public generateUrlPAram(conf): string {
    const tempConfig = Object.assign({}, this.config, conf);
    let urlParam = '';
    for (const key in tempConfig) {
      if (tempConfig.hasOwnProperty(key)) {
        Object.keys(tempConfig).indexOf(key) === 0
          ? (urlParam += `?${key}=${tempConfig[key]}`)
          : (urlParam += `&${key}=${tempConfig[key]}`);
      }
    }
    return urlParam;
  }

  public getM(url: string) {
    return this.http.get(`${this.API_URL}/${url}`, { observe: 'response' });
  }

  getAll<T>(resourceName: string) {
    const url = `${this.API_URL}/${resourceName}`;
    return axios
    .get(url)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      throw error;
    });
  }

  public findSoapServicesProblems(days: Number, config: PaginationRequest) {
    const params = this.generateUrlPAram(config);
    return this.getM(`dashboard/soap-service-problems/${days}${params}`);
  }

  public findRestServicesProblems(days: Number, config: PaginationRequest) {
    const params = this.generateUrlPAram(config);
    return this.getM(`dashboard/rest-service-problems/${days}${params}`);
  }

}