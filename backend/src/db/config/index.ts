import { config } from '../../config';
import { Client } from 'pg';

const client = new Client({
    user: config.dbUser,
    password: config.dbPassword,
    host: config.dbHost,
    database: config.dbName,
    port: typeof config.dbPort === 'string' ? parseInt(config.dbPort) : config.dbPort,
    ssl: config.env === 'production' ? { rejectUnauthorized: false } : false,
});

client.connect();

export { client };