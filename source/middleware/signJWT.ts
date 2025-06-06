import logs, { NAMESPACE } from '../utils/logs';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { iUser } from '../interfaces/interface';

const jwtAuth = NAMESPACE.AUTH;

const signJWT = (user: iUser, callback: (error: Error | null, token: string | null) => void): void => {
    const { expireTime, secret, issuer } = config.server.token;

    var timeSinchEpoch = new Date().getTime();
    var expirationTime = timeSinchEpoch + Number(expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    logs.info(jwtAuth, `Attempting to sign token for ${user.username}`);

    try {
        jwt.sign(
            { username: user.username },
            secret,
            {
                issuer: issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error: unknown) {
        const err = error instanceof Error ? error : new Error(String(error));
        logs.error(jwtAuth, err.message, err);
        callback(err, null);
    }
};

export default signJWT;
