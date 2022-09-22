import CategoryController from "./CategoryController.controller";
import CategoryService from "./CategoryService.service";
import * as express from "express";
import IAppResources from "../../common/IAppResources.interface";
import IRouter from "../../common/IRouter.interface";

class CategoryRouter implements IRouter{
    public  setupRoutes(app:express.Application , resources:IAppResources){
        const categoryService:CategoryService = new CategoryService(resources.databaseConnection);
        const categoryController: CategoryController = new CategoryController(categoryService);

        app.get("/api/category", categoryController.getAll.bind(categoryController));
        app.get("/api/category/:id", categoryController.getById.bind(categoryController));
        app.post("/api/category", categoryController.add.bind(categoryController));
        app.put("/api/category/:id", categoryController.edit.bind(categoryController));


    }
}
export default CategoryRouter;