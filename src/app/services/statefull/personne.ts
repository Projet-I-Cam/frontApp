import Parse from 'parse';

import { Etablissement, Personne } from '../../parseClass';

export const getPersonnes = async (contraints: any): Promise<any> => {
    try {
        const pQuery = new Parse.Query(Personne)
        if(contraints?.etablissemtId){
            pQuery.equalTo('etablissements', (await (new Parse.Query(Etablissement)).get(contraints?.etablissemtId))?.id) 
        }
        const personnes = await pQuery.find()
        console.log('Personne found:', personnes?.map(p => p.toJSON()))
        return personnes?.map(p => p.toJSON())
    } catch (error : any) {
        console.error('Error get all personnes', error)
        return {
            error: true,
            message: error?.message || "Ne peut résoudre la requete demandé !"
        }
    }
}

export const getOnePersonne = async (objectId: string): Promise<any> => {
    try {
        const pQuery = new Parse.Query(Personne)
        
        const personne = await pQuery.get(objectId)
        console.log('Personne found:', personne.toJSON())
        return personne.toJSON()
    } catch (error : any) {
        console.error('Error get one personne', error)
        return {
            error: true,
            message: error?.message || "Ne peut résoudre la requete demandé !"
        }
    }
}

export const createPersonne = async (data: any): Promise<any> => {
    try {
        const pQuery = new Personne()
        pQuery.set('nom', data?.nom)
        pQuery.set('nom', data?.prenom)
        pQuery.set('lieuNaissance', data?.lieuNaissance)
        pQuery.set('dateNaissance', data?.dateNaissance) // should be a javascript Date object eg: new Date(dateString)
        pQuery.set('etablissements', [await new Parse.Query(Etablissement).get(data?.etablissementId)])
        await pQuery.save()
        return {
            error: false,
            message: "Personne créée !"
        }
    } catch (error : any) {
        console.error('Error get one personne', error)
        return {
            error: true,
            message: error?.message || "Ne peut résoudre la requete demandé !"
        }
    }
}
export const deletePersonne = async (objectId: string): Promise<any> => {
    try {
        const destroyed = (await new Parse.Query(Personne).get(objectId)).destroy()
        console.log('Action status: ', destroyed)
        return {
            error: false,
            message: "Personne supprimée!"
        }
    } catch (error : any) {
        console.error('Error get one personne', error)
        return {
            error: true,
            message: error?.message || "Ne peut résoudre la requete demandé !"
        }
    }
}

export const updatePersonne = async (objectId: string, data: any): Promise<any> => {
    try {
        const personne = await new Parse.Query(Personne).get(objectId)
        personne.set("nom", data?.nom) // exple pour le champs appelé nom
        // Ainsi pour tous les champs

        await personne.save()
        return {
            error: false,
            message: "Personne mise a jour!"
        }
    } catch (error : any) {
        console.error('Error get one personne', error)
        return {
            error: true,
            message: error?.message || "Ne peut résoudre la requete demandé !"
        }
    }
}