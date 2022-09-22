import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";
const ajv = new Ajv();


export default interface IEditCategory extends IServiceData{
    name:string;
}
interface IEditCategoryDto{
    name:string;
}

const EditCategorySchema = {
    type:"object",
    properties:{
        name:{
            type:"string",
            minLength: 3,
            maxLength: 32,


        },
    },
    required:[
        "name",
    ],
    additionalProperties:false,

};
const EditCategoryValid = ajv.compile(EditCategorySchema);
export{EditCategoryValid};