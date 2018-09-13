/**
 * Created by Administrator on 2017/11/15/015.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
@Injectable()
export class CarloginService extends TBasicService {
  constructor(public http: Http) {
    super(http);
  }
  /**
   * carlogin页面
   * =================================================================================================
   */
  Login(username,userpwd){
    let data = {};
    data['useraccount'] = username;
    data['userpwd'] = userpwd;
    return this.Post(data,'backuser/adminLogin');
  }

 /**绑定账号 */
 Bindaccount(username,userpwd) {
  let data = {};
  data['useraccount'] = username;
  data['userpwd'] = userpwd;
  data['openid'] = localStorage.getItem('openid');
  return this.Post(data,'backuser/bindWechat');
 }
}
