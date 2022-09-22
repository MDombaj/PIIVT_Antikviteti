import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import AntiquityModel from "./AntiquityModel.model";

interface IAntiquityAdapterOptions extends IAdapterOptions{
    
}


class AntiquityService extends BaseService<AntiquityModel, {}>{
    tableName(): string {
        return "category";
    }
 




    public async adaptToModel(data: any,): Promise<AntiquityModel>{
        const antiquity: AntiquityModel = new AntiquityModel();
        antiquity.antiquityId= +data?.category_id;
        antiquity.appearanceDesc=data.appearance_desc;
        antiquity.materialDesc=data.material_desc;
        antiquity.description=data.description_desc;
        antiquity.backgroundDesc=data.background_desc;
        antiquity.origin=data.country_of_origin;
        antiquity.period=data.period;
        antiquity.isForSale=data.is_for_sale;
        antiquity.price=data.price;
        antiquity.link=data.link;
        antiquity.name= data?.name;

        return antiquity;
    }
}
export default AntiquityService;
export{IAntiquityAdapterOptions};