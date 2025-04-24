import Parse from 'parse';

import ParseClass from '../../parseClass';

const CLASS: any = ParseClass

export interface BaseGetIO {
    T: any; // la classe par de base. vous pouvez regarder app/parseClass.ts
    filters?: {}; //les contrainte
    includes?: Array<String>; // les jointure
    curentPage?: number; // pour la pagination. le currentpage peu etre 1 ou 2 pour la page 1 et 2
    size?: number; // le size le nombre max a recuperer par exemple je veux une pagination 10 par 10
    selects?: Array<String>; // les champs a selection. laissez vide si on veux tous prendre
    isOne?: Boolean // prendre seulelent 1 ou bien un array. est false si on veut one
}

export interface BasePostIO {
    T: any;
    dataObject: {}
}

export interface BasePutIO {
    T: any;
    objectId: string,
    dataObject: {}
}

export interface BaseDeleteIO {
    T: any;
    objectId: string
}

export const globalGet = async({T, filters, includes, curentPage, size, selects, isOne} : BaseGetIO): Promise<any> => {
    try {
        const query = new Parse.Query(CLASS?.[T])
        if(filters){
            Object.entries(filters).forEach(([key, value]: any) => {
                if(typeof value === "string"){
                    query.equalTo(key, value)
                }else{
                    query.equalTo(key, {"__type": "Pointer", "className": value?.className , "objectId": value?.objectId})
                }
            });
        }
        if(includes && includes.length){
            includes.forEach(key => {
                query.include(String(key))
            });
        }

        if(selects?.length){
            query.select([...selects.map(k => String(k))])
        }


        if(curentPage && size){
            query.skip((curentPage - 1) * size)
            query.limit(size);
        }
        let result
        if(!isOne){
            result = await query.find()
            return result?.map(data => data.toJSON())
        }else{
            result = await query.first()
            return result?.toJSON()
        }
    } catch (error: any) {
        console.error('Error  ', error?.message)
        console.error('Class triggered  ', T)
        return {
            error: true,
            message: error?.message || "Ne peux obtenir cette liste"
        }
    }
}

export const globalPost = async({T, dataObject} : BasePostIO): Promise<any> => {
    try {
        const query = new CLASS[T]()
        // Object.entries(dataObject).forEach(([key, value]: any) => {
        //     if(typeof value === "string" || Array.isArray(value)){
        //         query.set(key, value)
        //     }else{
        //         query.set(key, {__type: "Pointer", className: value?.className , objectId: value?.objectId})
        //     }
        // });
        Object.entries(dataObject).forEach(([key, value]: [string, any]) => {

            if(typeof value === "string" || Array.isArray(value) || value instanceof Date && !isNaN(value.getTime())){
        
                query.set(key, value);
        
            } else if (value && typeof value === "object" && value.className && value.objectId) {
        
                // Ensure that value is an object and has the required properties
        
                query.set(key, {
        
                    __type: "Pointer",
        
                    className: value.className,
        
                    objectId: value.objectId
        
                });
        
            } else {
        
                console.warn(`Invalid value for key "${key}":`, value);
                return;
            }
        
        });
        const r = await query.save();
        return r;
    } catch (error: any) {
        console.error('Error  ', error?.message)
        console.error('Class triggered  ', T)
        return {
            error: true,
            message: error?.message || "Ne ecrire dans cette classe"
        }
    }
}

export const globalPut = async({T, dataObject, objectId} : BasePutIO): Promise<any> => {
    try {
        const query = new Parse.Query(CLASS?.[T])
        const toUpdate = await query.get(objectId)
        Object.entries(dataObject).forEach(([key, value]: any) => {
            if(typeof value === "string" || Array.isArray(value)){
                toUpdate.set(key, value)
            }else{
                toUpdate.set(key, {"__type": "Pointer", "className": value?.className , "objectId": value?.objectId})
            }
        });
        const r =  await toUpdate.save()
        return {
            message: "Objet mise a jour",
            object: r
        }
    } catch (error: any) {
        console.error('Error  ', error?.message)
        console.error('Class triggered  ', T)
        return {
            error: true,
            message: error?.message || "Ne ecrire dans cette classe"
        }
    }
}

export const globalDelete = async({T, objectId} : BaseDeleteIO): Promise<any> => {
    try {
        const query = new Parse.Query(CLASS?.[T])
        const toDelete = await query.get(objectId)
        await toDelete.destroy();
        return {
            message: "Objet suprimer"
        }
    } catch (error: any) {
        console.error('Error  ', error?.message)
        console.error('Class triggered  ', T)
        return {
            error: true,
            message: error?.message || "Ne effacer cet objet"
        }
    }
}



