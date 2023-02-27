import { config } from '../../config';


const USER = encodeURIComponent(config.dbUser??'');
const PASSWORD = encodeURIComponent(config.dbPassword??'');
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

export const dbConfig = {
    development: {
        url: URI,
        dialect: 'postgres',
    },
    production: {
        url: URI,
        dialect: 'postgres',
    },
}