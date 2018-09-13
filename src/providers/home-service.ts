/**
 * Created by Administrator on 2017/11/24/024.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
@Injectable()
export class HomeService extends TBasicService {
  constructor(public http: Http) {
    super(http);
  }
  
}
