import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
@Injectable()
export class ApplyaccountService extends TBasicService {
  constructor(public http: Http) {
    super(http);
  }
 /**
   * applyaccount页面 提交信息 name联系人 phone 联系电话
   * =================================================================================================
   */
  // SubmitInfo(name,phone,loginaccount,accountname,pwd,ordernum) {
  //   let data = {};
  //   data['tokenId'] = localStorage.getItem('token');
  //   data['roleid'] = 34;
  //   data['remark'] = "微信订单"+ordernum;
  //   data['linkname'] = name; //联系人名称
  //   data['username'] = accountname; //账号名称
  //   data['useraccount'] = loginaccount;//登录账号
  //   data['userpwd'] = pwd;
  //   data['accounttype'] = "3";
  //   data['orederId'] = ordernum;
  //   data['linkmobile'] = phone;
  //   return this.Post(data,"partner/addOrUpdatePartner"); 
  // }
  SubmitInfo(name,phone) {
    let data = {};
    data['userName'] = name;
    data['userPhone'] = phone;
    return this.Post(data,"backuser/saveApplyUser"); 
  }
}
