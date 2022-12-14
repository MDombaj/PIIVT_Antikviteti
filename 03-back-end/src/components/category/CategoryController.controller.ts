import CategoryService from "./CategoryService.service";
import {Request , Response} from "express";
import IAddCategory, { AddCategoryValid } from "./dto/IAddCategory.dto";
import IEditCategory, { EditCategoryValid } from "./dto/IEditCategory.dto";


class CategoryController{
    private categoryService:CategoryService;

    constructor(categoryService: CategoryService){
        this.categoryService = categoryService;
    }
    async getAll(req: Request, res:Response){
        this.categoryService.getAll({})
        .then(result =>{
            res.send(result);
        })
        .catch(error =>{
            res.status(500).send(error?.message);
        });

    }
    async getById(req: Request, res: Response){
        const id: number = +(req.params?.id);

        this.categoryService.getById(id,{})
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
        const data  = req.body as IAddCategory;
        if(!AddCategoryValid(data)){
            return res.sendStatus(400).send(AddCategoryValid.errors);
        }

        this.categoryService.add(data)
        .then(result =>{
            res.send(result);
        })
        .catch(error =>{
            res.status(400).send(error?.message);
        })
    }
    async edit(req:Request,res:Response){
        
        const id: number = +(req.params?.id);
        const data  = req.body as IEditCategory;
        if(!EditCategoryValid(data)){
            return res.sendStatus(400).send(EditCategoryValid.errors);
        }

        this.categoryService.getById(id,{})
        .then(result =>{
            if (result === null){
                return res.sendStatus(404);
            }
            this.categoryService.editById(id, {
                name: data.name
            })
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
export default CategoryController;