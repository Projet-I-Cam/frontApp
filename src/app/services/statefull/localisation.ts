import Parse from 'parse';

import { Departement, Region } from '../../parseClass';
import { departments } from './../../shared/model/pages.model';

export const  getRegion = async(): Promise<any> => {
    try {
        const reg = new Parse.Query(Region)
        reg.include("departements")
        const regions: any = []
        const regionsFound = await reg.find()
        for (let k = 0; k < regionsFound.length; k++) {
            const region = regionsFound[k];
            const departements = await region.relation("departements").query().find()
            let departs : any = []
            for (let i = 0; i < departements.length; i++) {
                const departement = departements[i];
                const arrondissements = await departement.relation("arrondissements").query().find();
                departs.push({
                    nom: departement.get('nom'),
                    id: departement.id,
                    arrondissements: arrondissements.map(arrond => {
                        return {
                            id: arrond.id,
                            nom: arrond.get('nom')
                        }
                    })
                })
            };
            regions.push({
                departements: departs,
                id: region.id,
                nom_fr: region.get('nom_fr'),
                nom_en: region.get('nom_en'),
                code: region.get('code')
            })
        };
        console.log('Region found ', regions)
        return regions
    } catch (error) {
        console.error('Error load regions ', error)
        return []
    }
    
}

