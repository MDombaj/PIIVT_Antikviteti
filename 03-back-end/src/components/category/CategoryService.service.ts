import CategoryModel from "./CategoryModel.model";
import * as mysql2 from "mysql2/promise";
import { resolve } from "path";
import { rejects } from "assert";
import IAddCategory from "./dto/IAddCategory.dto";
import { ResultSetHeader } from "mysql2/promise";
import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import IEditCategory from "./dto/IEditCategory.dto";
import { IAntiquityAdapterOptions } from "../antiquity/AntiquityService.service";


interface ICategoryAdapterOptions extends IAdapterOptions{
    
}


class CategoryService extends BaseService<CategoryModel, {}>{
    tableName(): string {
        return "category";
    }
 




    public async adaptToModel(data: any,): Promise<CategoryModel>{
        const category: CategoryModel = new CategoryModel();
        category.categoryId= +data?.category_id;
        category.name= data?.name;

        return category;
    }




    public async add(data: IAddCategory): Promise<CategoryModel>{
        return new Promise<CategoryModel>((resolve,rejects) =>{
            const sql:string = "INSERT category SET name = ?;";
            this.databaseConnection.execute(sql, [data.name])
            .then(async result =>{
                const info:any = result;
                const newCategoryId = +(info[0]?.insertId);
                const newCategory: CategoryModel|null = await this.getById(newCategoryId,{});
                if(newCategory === null){
                    return rejects({message: 'Greska!', });
                }
                resolve(newCategory);
            })
            .catch(error =>{
                rejects(error);
            });
        })
    }
    public async editById(categoryId:number, data:IEditCategory): Promise<CategoryModel>{
        return this.baseEditById(categoryId,data,{});
        
    }
    public async getAllByAntiquityId(antiquityId: number, options: IAntiquityAdapterOptions): Promise<CategoryModel[]>{
        return new Promise((resolve, reject) => {
            this.baseGetAllFromTableByFieldNameAndValue<{
                antiquity_category_id: number,
                antiquity_id: number,
                category_id: number,
            }>("antiquity_category", "antiquity_id", antiquityId)
            .then(async result => {
                if(result.length === 0){
                    return resolve([]);
                }

                const categories: CategoryModel[] = await Promise.all(
                    result.map(async row => {
                        const category = await (await this.getById(row.category_id, {}));

                        return {
                            categoryId: row.category_id,
                            name: category.name,
                            
                        }

                    })
                );

                resolve(categories);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    }
export default CategoryService;