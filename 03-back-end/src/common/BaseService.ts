import { rejects } from "assert";
import * as mysql2 from "mysql2/promise";
import { resolve } from "path";
import IAdapterOptions from "./IAdapterOptions.interface";
import IModel from "./IModel.interface";
import IServiceData from "./IServiceData.interface";

export default abstract class BaseService <ReturnModel extends IModel, AdapterOptions extends IAdapterOptions>{
    private database: mysql2.Connection;

    constructor (databaseConnection:mysql2.Connection){
        this.database=databaseConnection;
    }
    protected get databaseConnection():mysql2.Connection{
        return this.database;
    }
    abstract tableName(): string;

    abstract  adaptToModel(data: any , options:AdapterOptions): Promise<ReturnModel>;
    public getAll(options:AdapterOptions): Promise<ReturnModel[]>{
        const tableName = this.tableName();
        return new Promise<ReturnModel[]>((resolve,reject) =>{
            const sql: string = `SELECT * FROM \`${tableName}\` ;`;
            this.databaseConnection.execute(sql) 
            .then( async( [rows] ) =>{
                if (rows === undefined){
                   return resolve([]);
                }
                const items:ReturnModel[] = [];
                for (const row of rows as mysql2.RowDataPacket[] ){
                   items.push (await this.adaptToModel(row , options));
                }
                resolve(items);
            })
            .catch(error =>{
                reject(error);
            })
        });
    };
    public getById(id: number, options: AdapterOptions): Promise<ReturnModel|null> {
        const tableName = this.tableName();

        return new Promise<ReturnModel>(
            (resolve, reject) => {
                const sql: string = `SELECT * FROM \`${ tableName }\` WHERE ${tableName}_id = ?;`;

                this.databaseConnection.execute(sql, [ id ])
                    .then( async ( [ rows ] ) => {
                        if (rows === undefined) {
                            return resolve(null);
                        }

                        if (Array.isArray(rows) && rows.length === 0) {
                            return resolve(null);
                        }

                        resolve(
                            await this.adaptToModel(
                                rows[0],
                                options
                            )
                        );
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        );
    }


    public async getAllByFieldIdAndValue(fieldName: string,value:any,options: AdapterOptions): Promise<ReturnModel[]>{
        const tableName = this.tableName();
        return new Promise<ReturnModel[]>((resolve,reject) =>{
            const sql: string = `SELECT * FROM \`${ tableName }\` WHERE \`${ fieldName }\` = ?;`;
            this.databaseConnection.execute(sql, [ value ])
            .then( async ( [ rows ] ) => {
                if (rows === undefined) {
                    return resolve([]);
                }
                const categories: ReturnModel[] = [];

                        for (const row of rows as mysql2.RowDataPacket[]) {
                            categories.push(await this.adaptToModel(row, options));
                        }

                        resolve(categories);
                    })
                    .catch(error => {
                        reject(error);
                    });
        }
            
        
        )};
        public async baseAdd(data:IServiceData, options:AdapterOptions): Promise<ReturnModel>{
            const tableName = this.tableName();
            return new Promise((resolve,reject) =>{
                const properties = Object.getOwnPropertyNames(data);
                const sqlPairs = properties.map(property => "`" + property + "` = ?").join(", ");
                const values = properties.map(property => data[property]);

                const sql:string = "INSERT `"+ tableName +"` SET " + sqlPairs + ";";

                this.databaseConnection.execute(sql, values)
                .then(async result =>{
                    const info:any = result;
                    const newItemId = +(info[0]?.insertId);

                    const newItem: ReturnModel|null = await this.getById(newItemId,options);
                    if(newItem === null){
                        return reject({message: 'Greska!', });
                    }
                    resolve(newItem);
                })
                .catch(error =>{
                    reject(error);
                })
            });
        }

        public async baseEditById(id:number, data:IServiceData, options:AdapterOptions):Promise<ReturnModel>{
            const tableName = this.tableName();
            return new Promise((resolve,reject) =>{

                const properties = Object.getOwnPropertyNames(data);
                const sqlPairs = properties.map(property => "`" + property + "` = ?").join(", ");
                const values = properties.map(property => data[property]);
                values.push(id);

                const sql:string = "UPDATE `"+ tableName +"` SET " + sqlPairs + " WHERE `"+ tableName +"_id` = ?;";

                this.databaseConnection.execute(sql, values)
                .then(async result =>{
                    const info:any = result;
                    if(info[0]?.affectedRows === 0){
                        return reject({message:"Could not change any items",});
                    }

                    const item: ReturnModel|null = await this.getById(id,options);
                    if(item === null){
                        return reject({message: 'Could not find item', });
                    }
                    resolve(item);
                })
                .catch(error =>{
                    reject(error);
                });
            })
        }
        protected async baseGetAllFromTableByFieldNameAndValue<OwnReturnType>(tableName: string, fieldName: string, value: any): Promise<OwnReturnType[]> {
            return new Promise(
                (resolve, reject) => {
                    const sql =  `SELECT * FROM \`${ tableName }\` WHERE \`${ fieldName }\` = ?;`;
    
                    this.databaseConnection.execute(sql, [ value ])
                    .then( async ( [ rows ] ) => {
                        if (rows === undefined) {
                            return resolve([]);
                        }
    
                        const items: OwnReturnType[] = [];
    
                        for (const row of rows as mysql2.RowDataPacket[]) {
                            items.push(row as OwnReturnType);
                        }
    
                        resolve(items);
                    })
                    .catch(error => {
                        reject(error);
                    });
                }
            );
        }
}