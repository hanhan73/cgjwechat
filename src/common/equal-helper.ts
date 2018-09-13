export class Helper 
{
    private _recursiveProperties: string[] = ['RecursiveProperty',];

    public equals(obj1: any, obj2: any): boolean 
    {
        if (typeof obj1 !== typeof obj2) 
        {
            return false;
        }

        if ((obj1 === undefined && obj2 !== undefined) ||
            (obj2 === undefined && obj1 !== undefined) ||
            (obj1 === null && obj2 !== null) ||
            (obj2 === null && obj1 !== null)) 
        {
            return false;
        }

        if (typeof obj1 === 'object') 
        {
            if (Array.isArray(obj1)) 
            {
                if (!Array.isArray(obj2) || obj1.length !== obj2.length) 
                {
                    return false;
                }

                for (let i = 0; i < obj1.length; i++) 
                {
                    if (!this.equals(obj1[i], obj2[i])) 
                    {
                        return false;
                    }
                }
            } 
            else 
            {
                for (let prop in obj1) 
                {
                    if (obj1.hasOwnProperty(prop)) 
                    {
                        if (!obj2.hasOwnProperty(prop)) 
                        {
                            return false;
                        }

                        //Endless loop fix for recursive properties
                        if (this._recursiveProperties.indexOf(prop) >= 0) 
                        {
                            if (obj1[prop] !== obj2[prop]) 
                            {
                                return false;
                            }
                        } 
                        else if (!this.equals(obj1[prop], obj2[prop])) 
                        {
                            return false;
                        }
                    }
                }

                for (let prop in obj2) 
                {
                    if (obj2.hasOwnProperty(prop)) 
                    {
                        if (!obj1.hasOwnProperty(prop)) 
                        {
                            return false;
                        }
                    }
                }

            }

            return true;
        }
        
        return obj1 === obj2;
    }
}