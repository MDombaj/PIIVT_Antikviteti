import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";
const ajv = new Ajv();


export default interface IAddCategory extends IServiceData{
    name:string;
}

const AddCategorySchema = {
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
const AddCategoryValid = ajv.compile(AddCategorySchema);
export{AddCategoryValid};