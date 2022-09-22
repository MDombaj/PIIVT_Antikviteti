import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";
const ajv = new Ajv();


export default interface IEditAntiquity extends IServiceData{
    name:string;
}

const EditAntiquitySchema = {
    type:"object",
    properties:{

        appearanceDesc:{
            type:"string",
            minLength: 3,
            
        },

        materialDesc:{
            type:"string",
            minLength: 3,
        },
        description:{
            type:"string",
            minLength: 3
        },
        backgroundDesc:{
            type:"string",
            minLength: 3
        },
        origin:{
            type:"string",
            minLength: 3,
            mixLength: 64

        },
        period:{
            type:"string",
            minLength: 3,
            mixLength: 64
        },
        isForSale:{
            type:"boolean",
           
        },
        price:{
            type:"number"
        },
        link:{
            type:"string"
        },
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
const EditAntiquityValid = ajv.compile(EditAntiquitySchema);
export{EditAntiquityValid};