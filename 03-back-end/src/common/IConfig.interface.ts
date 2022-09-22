interface IConfig{
    server:{
        port: number;
        
        static:{
        index: string | false;
        dotfiles: "allow"|"deny";
        cacheControl: boolean;
        etag: boolean;
        maxAge: number;
        route:string;
        path:string;

        }
    },
    database:{
        host: string,
        port: number,
        user: string,
        password: string,
        database: string,
        charset: 'utf8',
        timezone: '+01:00',
    },

}
export default IConfig;