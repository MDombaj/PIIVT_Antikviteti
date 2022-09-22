import * as mysql2 from "mysql2/promise"


interface IAppResources{
    databaseConnection: mysql2.Connection;

}
export default IAppResources;