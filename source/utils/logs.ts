import moment from 'moment';

interface iLogger {
    (namespace: string, message: string, object?: any): void;
};

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
type Logger = (level: LogLevel) => iLogger;
type creativeLog = Record<LogLevel, string>;

const ICONS: creativeLog = { INFO: '🚀', WARN: '⚠️', ERROR: '💀', DEBUG: '⚒️' };
const COLORS: creativeLog = { INFO: '34', WARN: '33', ERROR: '31', DEBUG: '35' };

const getTimeStamp = (): string => moment().format('DD-MM-YYYY ~ hh:mm:ss A');
const colorize = (text: string, color: string): string => `\x1b[1;${color}m${text}\x1b[0m`;

const customLog: Logger = (level) => (namespace, message, object) => {
    const icon = ICONS[level];
    const color = COLORS[level];
    const format = `| ${getTimeStamp()} | ${colorize(`${icon} [${level}] [${namespace}] [${message}] ${icon}`, color)}`;
    const logger = console[level.toLowerCase() as keyof Console] as (...args: any[]) => void;
    console.info('----------------------------');
    object ? logger(format, object) : logger(format);
    console.info('----------------------------');
};

export default { info: customLog('INFO'), warn: customLog('WARN'), error: customLog('ERROR'), debug: customLog('DEBUG') };

export const NAMESPACE = { SERVER: 'Server', USER: 'User', AUTH: 'Auth' };
