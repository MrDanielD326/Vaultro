import { Request, Response, NextFunction } from 'express';
import logs, { NAMESPACE } from '../utils/logs';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const extractJWT = (req: Request, res: Response, next: NextFunction): void => {
    logs.info(NAMESPACE.AUTH, 'Validating Token');

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    jwt.verify(token, config.server.token.secret, (error, decoded) => {
        if (error) {
            res.status(401).json({ message: error.message, error });
            return;
        }

        res.locals.jwt = decoded;
        next();
    });
};

export default extractJWT;
