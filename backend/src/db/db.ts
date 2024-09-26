import  dotenv from 'dotenv';
import {Client} from 'pg';
import logger from '../utils/logger';
dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DATABASE;
const DATABASE_PORT = process.env.DATABASE_PORT;
const HOST = process.env.HOST;

export const client = new Client({
    host: HOST,
    port: Number(DATABASE_PORT),
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE
})

export const Connection = () =>{

    client.connect()
        .then(()=>logger.info('Database connected successfully'))
        .catch(()=>logger.error('Error while connection'));
}
