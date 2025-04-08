import Parse from 'parse';

import { Arrondissement, Departement, Region } from '../../parseClass';
import { departments } from './../../shared/model/pages.model';

export interface BaseGetIO {
    T: any;
    filters?: {};
    includes?: Array<String>;
    curentPage?: number; 
    size?: number; 
    selects?: Array<String>;
    isOne?: Boolean 
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
        const query = new Parse.Query(T)
        if(filters){
            Object.entries(filters).forEach(([key, value]: any) => {
                if(typeof value === "string"){
                    query.equalTo(key, value)
                }else{
                    query.equalTo(key, {"__type": "Pointer", "className": value?.className , "objectId": value?.objectId}) 
                }
            });
        }
        if(includes){
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
        console.log('query query query ', query)
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
        const query = new T()
        Object.entries(dataObject).forEach(([key, value]: any) => {
            if(typeof value === "string"){
                query.set(key, value)
            }else{
                query.set(key, {"__type": "Pointer", "className": value?.className , "objectId": value?.objectId}) 
            }
        });
        await query.save()
        return {
            message: "Objet sauvegardé"
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

export const globalPut = async({T, dataObject, objectId} : BasePutIO): Promise<any> => {
    try {
        const query = new Parse.Query(T)
        const toUpdate = await query.get(objectId)
        Object.entries(dataObject).forEach(([key, value]: any) => {
            if(typeof value === "string"){
                toUpdate.set(key, value)
            }else{
                toUpdate.set(key, {"__type": "Pointer", "className": value?.className , "objectId": value?.objectId}) 
            }
        });
        await toUpdate.save()
        return {
            message: "Objet mise a jour"
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
        const query = new Parse.Query(T)
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



