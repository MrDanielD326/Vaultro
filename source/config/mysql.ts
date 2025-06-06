import mysql from 'mysql';
import config from './config';

const { user, password, host, database } = config.mysql;

// Create a pool instead of individual connections for params
const pool = mysql.createPool({
    user: user,
    password: password,
    host: host,
    database: database,
    connectionLimit: 10,
    queueLimit: 0
});

const Connect = async () =>
    new Promise<mysql.Connection>((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(connection);
        });
    });

const Query = async <T>(connection: mysql.Connection, query: string, params?: any[]) =>
    new Promise<T>((resolve, reject) => {
        connection.query(query, params, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });

export { Connect, Query };
