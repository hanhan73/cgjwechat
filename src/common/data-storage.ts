import { Storage } from '@ionic/storage';

export class TDataStorage
{
    constructor(Sender: Storage)
    {
        this.FStorage = Sender;
    }

    GetState(): Promise<any>
    {
        return this.FStorage.get('state')            
    }

    GetOpenId(): Promise<any>
    {
        return this.FStorage.get('openid')
    }

    SetState(value)
    {
        this.FStorage.set('state', value)
    }

    SetOpenId(value)
    {
        this.FStorage.set('openid', value)
    }

    private FStorage: Storage    
}