import AntiquityService from "./AntiquityService.service";
import {Request,Response} from "express";
import IAddAntiquity, { AddAntiquityValid } from "./dto/IAddAntiquity.dto";
import IEditAntiquity, { EditAntiquityValid } from "./dto/IEditAntiquity.dto";

class AntiquityController{
    private antiquityService:AntiquityService;

    constructor(antiquityService: AntiquityService){
        this.antiquityService = antiquityService;
    }
    async getAll(req: Request, res:Response){
        this.antiquityService.getAll({})
        .then(result =>{
            res.send(result);
        })
        .catch(error =>{
            res.status(500).send(error?.message);
        });

    }
    async getById(req: Request, res: Response){
        const id: number = +(req.params?.id);

        this.antiquityService.getById(id,{})
        .then(result =>{
            if (result === null){
                return res.sendStatus(404);
            }
            res.send(result);
            
        })
        .catch(error =>{
            res.status(500).send(error?.message);
        });


    }

    async add(req:Request,res:Response){
        const data  = req.body as IAddAntiquity;
        if(!AddAntiquityValid(data)){
            return res.sendStatus(400).send(AddAntiquityValid.errors);
        }

        this.antiquityService.baseAdd(data,{})
        .then(result =>{
            res.send(result);
        })
        .catch(error =>{
            res.status(400).send(error?.message);
        })
    }
    async edit(req:Request,res:Response){
        
        const id: number = +(req.params?.id);
        const data  = req.body as IEditAntiquity;
        if(!EditAntiquityValid(data)){
            return res.sendStatus(400).send(EditAntiquityValid.errors);
        }

        this.antiquityService.getById(id,{})
        .then(result =>{
            if (result === null){
                return res.sendStatus(404);
            }
            this.antiquityService.baseEditById(id, {
                name: data.name
            },{})
            .then(result =>{
                res.send(result);
            })
            .catch(error =>{
                 res.sendStatus(400).send(error?.message);
            })
            
            
        })
        .catch(error =>{
            res.status(500).send(error?.message);
        });
    }

}
export default AntiquityController;