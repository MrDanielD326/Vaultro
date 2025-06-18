import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import logs, { NAMESPACE } from './utils/logs';
import config from './config/config';
import userRoutes from './routes/user';
import path from "path";

const appServer = NAMESPACE.SERVER;

const app = express();

// Logging the request
app.use((req: Request, res: Response, next: NextFunction) => {
    const {
        method,
        url,
        socket: { remoteAddress }
    } = req;
    const baseLog = `METHOD:- [${method}], URL:- [${url}], IP:- [${remoteAddress}]`;
    logs.info(appServer, baseLog);
    res.on('finish', () => {
        logs.info(appServer, `${baseLog}, STATUS:- [${res.statusCode}]`);
    });
    next();
});

// Parse the request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rules of API
app.use((req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, POST, PUT');
        res.status(200).json({});
    }
    next();
});

// Routes
app.use('/users', userRoutes);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "../public")));

// Error handling
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not Found');
    res.status(404).json({ message: error.message });
});

// Create a Server
const { port, hostname } = config.server;
const httpServer = http.createServer(app);
httpServer.listen(port, () => logs.info(appServer, `SERVER RUNNING ON ${hostname}:${port}`));

export default app;
