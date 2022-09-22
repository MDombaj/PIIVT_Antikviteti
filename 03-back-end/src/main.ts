import * as express from "express";
import * as cors from "cors";
import * as mysql2 from "mysql2/promise";
import IConfig from "./common/IConfig.interface";
import { DevConfig } from "./configs";
import CategoryRouter from "./components/category/CategoryRouter.router";
import IAppResources from "./common/IAppResources.interface";
import AppRouters from "./routers";



async function main(){
    const config: IConfig= DevConfig;

const appResources: IAppResources= {
    databaseConnection: await mysql2.createConnection({
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        charset: config.database.charset,
        timezone: config.database.timezone,

    })
}
const app: express.Application = express();

app.use(express.json());
app.use(cors());

app.use(config.server.static.route , express.static(config.server.static.path, {

    index:config.server.static.index,
    dotfiles:config.server.static.dotfiles ,
    cacheControl: config.server.static.cacheControl,
    etag: config.server.static.etag,
    maxAge: config.server.static.maxAge

}));

app.use(cors());
app.get('/about', (req , res) => {

    res.send("<h1>O nama </h1>");
});
app.get('/category', (req , res) => {



    });
    for (const router of AppRouters){
        router.setupRoutes(app,appResources);
    }

    

app.use((req , res) => {
    res.sendStatus(404);
});
app.listen(config.server.port);
}

process.on('uncaughtException', error =>{
    console.error('ERROR', error);
})
main();