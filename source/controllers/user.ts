import logs, { NAMESPACE } from '../utils/logs';
import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import signJWT from '../middleware/signJWT';
import { Connect, Query } from '../config/mysql';
import { iResultMySQL, iUser } from '../interfaces/interface';
import { PoolConnection } from 'mysql';

const commonUser = NAMESPACE.USER;

const validation = (req: Request, res: Response, next: NextFunction): void => {
    logs.info(commonUser, 'Token validated and User is authenticated');
    res.status(200).json({ message: 'Authorized' });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;
    let connection: PoolConnection | null = null;

    try {
        const hash = await bcryptjs.hash(password, 10);
        connection = (await Connect()) as PoolConnection;

        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const result = await Query<iResultMySQL>(connection, query, [username, hash]);

        logs.info(commonUser, `User with ID ${result.insertId} inserted`);
        return res.status(201).json({ result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        logs.error(commonUser, message, error);
        return res.status(500).json({ message, error });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;
    let connection: PoolConnection | null = null;

    try {
        connection = (await Connect()) as PoolConnection;
        const query = 'SELECT * FROM users WHERE username = ?';
        const users = await Query<iUser[]>(connection, query, [username]);

        if (!users || users.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = users[0];

        const match = await bcryptjs.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        signJWT(user, (error, token) => {
            if (error) {
                return res.status(401).json({ message: 'Unable to Sign JWT', error: error });
            } else if (token) {
                return res.status(200).json({
                    message: 'Auth Successful',
                    token,
                    user: {
                        _id: user._id,
                        username: user.username
                    }
                });
            }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        logs.error(commonUser, message, error);
        return res.status(500).json({ message, error });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    let connection: PoolConnection | null = null;

    try {
        connection = (await Connect()) as PoolConnection;
        const query = 'SELECT _id, username FROM users';
        const users = await Query<iUser[]>(connection, query);

        return res.status(200).json({ users, count: users.length });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        logs.error(commonUser, message, error);
        return res.status(500).json({ message, error });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

export default { validation, register, login, getAllUsers };
