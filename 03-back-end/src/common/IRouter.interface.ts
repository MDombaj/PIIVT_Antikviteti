import * as express from "express";
import IAppResources from "./IAppResources.interface";

export default  interface IRouter{
    setupRoutes(app:express.Application , resources:IAppResources);
}