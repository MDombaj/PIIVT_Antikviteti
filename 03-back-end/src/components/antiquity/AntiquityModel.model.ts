import IModel from "../../common/IModel.interface";

class AntiquityModel implements IModel{
    antiquityId:number;
    appearanceDesc:string;
    materialDesc:string;
    description:string;
    backgroundDesc:string;
    origin:string;
    period:string;
    isForSale:boolean;
    price:number|null;
    link:string|null;
    name:string;


}
export default AntiquityModel;