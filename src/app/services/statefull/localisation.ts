import Parse from 'parse';

import { Region } from '../../parseClass';

export const  getRegion = async(): Promise<any> => {
    try {
        const regQuery = new Parse.Query(Region)
        regQuery.include("departements")
        regQuery.include("departements.arrondissements")
        regQuery.select(["nom_fr", "nom_en", "code", "departements.nom", "departements.arrondissements.nom"])
        const regionsFound = await regQuery.find()
        const regions = regionsFound.map(r => r.toJSON())
        console.log('Region found ', regions)
        return regions
    } catch (error) {
        console.error('Error load regions ', error)
        return []
    }
    
}