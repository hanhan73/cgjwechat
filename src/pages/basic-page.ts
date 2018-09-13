import { Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';


@Injectable()
export class TCommonPage
{
    constructor(public navCtrl: NavController, public navParams?: NavParams, public loadingCtrl?: LoadingController, public toastCtrl?: ToastController)
    {
    }

    GoBack()
    {
        this.navCtrl.pop();
    }

    Loading(context="数据加载中", duration=8000)
    {
        if (this.loadingCtrl != undefined)
        {
            this.loader = this.loadingCtrl.create(
                {
                    content: context,
                    duration: duration
                }
            );

            this.loader.present();
        }
    }

    FreeLoading()
    {
        if (this.loader != undefined)
        {
            this.loader.dismiss();
        }
    }

    ShowToast(message, duration = 2000, position = "middle")
    {
        if (this.toastCtrl != undefined)
        {
            let toast = this.toastCtrl.create(
                {
                    message: message,
                    duration: duration,
                    position: position,
                }
            );

            toast.present(toast);

        }
    }
    // presentToast(info) {
    //   let toast = this.toastCtrl.create({
    //     message: info,
    //     duration: 3000
    //   });
    //   toast.present();
    // }

    date2str(date)
    {
        let dateSeparator = "-";    
        let year = date.getFullYear();// 获取完整的年份(4位,1970)
        let month = date.getMonth();// 获取月份(0-11,0代表1月,用的时候记得加上1)
        let day = date.getDate();// 获取日(1-31)

        let Y = year + dateSeparator;
        let M = ((month + 1) > 9 ? (month + 1) : ('0' + (month + 1))) + dateSeparator;
        let D = (day > 9 ? day : ('0' + day));

        return Y + M + D;
    }

    changecode(data) {
        if(data.errId === "-1003") {
            this.navCtrl.push('CarloginPage');
        }else {
            this.ShowToast(data.message);
        }
    }

    private loader;
}

