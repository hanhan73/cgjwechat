import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { const_data } from '../common/application-const';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';


@Injectable()
export class TBasicService {

  constructor(public http: Http)
  {
    this.host_url = const_data.host_url;
  }
// let token = localStorage.getItem('token');
  // console.log(token);
  // if (token)
  // {
  //   headers.append('Authorization', token);
  // }
  CreateHeader(): any
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //console.log(headers);
    return new RequestOptions({headers: headers});
  }

  Get(uri?: string, path: string = ''): Promise<any>
  {
    let url = ''
    if (path) {
      url = path
    }else {
      url = this.host_url;
    }
    if (uri)
    {
        url = url + '/' + uri;
    }
    let options = this.CreateHeader();
    // console.log(options)
    return this.http.get(url, options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError)
  }

  Post(data: any, uri?: string, path: string = ''): Promise<any>
  {
    let url = ''
    if (path) {
      url = path
    }else {
      url = this.host_url;
    }
    if (uri)
    {
        url = url + '/' + uri;
    }
    let str = '';
    data['tokenId'] = localStorage.getItem('tokenId');
    console.log('改过之后'+data['tokenId']);
    for (const i in data) {
      str += `${i}=${data[i]}&`;
    }
    str = str.substring(0,str.length- 1)
    // console.log(str);
    let options = this.CreateHeader();
    return this.http.post(url, str, options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError)
  }

  Put(data: any, uri?: string): Promise<any>
  {
    let url = this.host_url;
    if (uri)
    {
        url = url + '/' + uri;
    }

    let options = this.CreateHeader();
    return this.http.put(url, data, options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError)
  }

  Delete(uri?: string): Promise<any>
  {
    let url = this.host_url;
    if (uri)
    {
        url = url + '/' + uri;
    }

    let options = this.CreateHeader();
    return this.http.delete(url, options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError)
  }

  private extractData(res: Response)
  {
    let body = res.json();
    return body;
  }

  private handleError(error: Response | any)
  {
    let errMsg: string;
    if (error instanceof Response)
    {
      errMsg = `${error.status} - ${error.statusText}`;
    }
    else
    {
      errMsg = error.message ? error.message : error.toString();
    }

    //console.error(errMsg);
    return Promise.reject(errMsg);
  }

  private host_url: string;
}
