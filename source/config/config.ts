import dotenv from 'dotenv';

dotenv.config();

const config = {
    server: {
        port: process.env.SERVER_PORT || 1337,
        hostname: process.env.SERVER_HOSTNAME || 'localhost',
        token: {
            expireTime: process.env.SERVER_TOKEN_EXPIRE_TIME || 86400,
            issuer: process.env.SERVER_TOKEN_ISSUER || 'issuer',
            secret: process.env.SERVER_TOKEN_SECRET || 'secret'
        }
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        database: process.env.MYSQL_DATABASE || 'database_name',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'password'
    }
};

export default config;
