/**
 * Structured Logging System
 * 
 * Provides consistent logging with levels, context, and timestamps.
 * Useful for debugging and monitoring application behavior.
 * 
 * @example
 * ```typescript
 * import { logger } from './Logger';
 * 
 * logger.info('User logged in', { userId: '123' });
 * logger.error('Failed to save', { error: err.message });
 * logger.debug('Cache hit', { key: 'content/hero' });
 * ```
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
    level: LogLevel;
    message: string;
    context?: Record<string, any>;
    timestamp: string;
}

interface LoggerOptions {
    /** Minimum log level to output */
    minLevel?: LogLevel;
    /** Enable console output */
    console?: boolean;
    /** Enable storing logs in memory */
    store?: boolean;
    /** Maximum number of logs to store */
    maxLogs?: number;
}

const LOG_LEVELS: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};

export class Logger {
    private minLevel: number;
    private enableConsole: boolean;
    private enableStore: boolean;
    private maxLogs: number;
    private logs: LogEntry[] = [];

    constructor(options: LoggerOptions = {}) {
        this.minLevel = LOG_LEVELS[options.minLevel || 'info'];
        this.enableConsole = options.console !== false;
        this.enableStore = options.store || false;
        this.maxLogs = options.maxLogs || 100;
    }

    /**
     * Check if log level should be output
     */
    private shouldLog(level: LogLevel): boolean {
        return LOG_LEVELS[level] >= this.minLevel;
    }

    /**
     * Format log entry for console output
     */
    private formatConsoleLog(entry: LogEntry): void {
        const emoji = {
            debug: '🔍',
            info: 'ℹ️',
            warn: '⚠️',
            error: '❌',
        }[entry.level];

        const style = {
            debug: 'color: #6b7280',
            info: 'color: #3b82f6',
            warn: 'color: #f59e0b',
            error: 'color: #ef4444; font-weight: bold',
        }[entry.level];

        console.log(
            `%c${emoji} [${entry.level.toUpperCase()}] ${entry.message}`,
            style,
            entry.context || ''
        );
    }

    /**
     * Store log entry in memory
     */
    private storeLog(entry: LogEntry): void {
        if (!this.enableStore) return;

        this.logs.push(entry);

        // Trim logs if exceeds max
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs);
        }
    }

    /**
     * Core logging method
     */
    private log(level: LogLevel, message: string, context?: Record<string, any>): void {
        if (!this.shouldLog(level)) return;

        const entry: LogEntry = {
            level,
            message,
            context,
            timestamp: new Date().toISOString(),
        };

        if (this.enableConsole) {
            this.formatConsoleLog(entry);
        }

        this.storeLog(entry);
    }

    /**
     * Debug level log
     */
    debug(message: string, context?: Record<string, any>): void {
        this.log('debug', message, context);
    }

    /**
     * Info level log
     */
    info(message: string, context?: Record<string, any>): void {
        this.log('info', message, context);
    }

    /**
     * Warning level log
     */
    warn(message: string, context?: Record<string, any>): void {
        this.log('warn', message, context);
    }

    /**
     * Error level log
     */
    error(message: string, context?: Record<string, any>): void {
        this.log('error', message, context);
    }

    /**
     * Get all stored logs
     */
    getLogs(): LogEntry[] {
        return [...this.logs];
    }

    /**
     * Get logs filtered by level
     */
    getLogsByLevel(level: LogLevel): LogEntry[] {
        return this.logs.filter((log) => log.level === level);
    }

    /**
     * Clear all stored logs
     */
    clearLogs(): void {
        this.logs = [];
    }

    /**
     * Export logs as JSON
     */
    exportLogs(): string {
        return JSON.stringify(this.logs, null, 2);
    }

    /**
     * Get log statistics
     */
    getStats(): Record<LogLevel, number> {
        return {
            debug: this.logs.filter((l) => l.level === 'debug').length,
            info: this.logs.filter((l) => l.level === 'info').length,
            warn: this.logs.filter((l) => l.level === 'warn').length,
            error: this.logs.filter((l) => l.level === 'error').length,
        };
    }
}

/**
 * Global logger instance
 */
export const logger = new Logger({
    minLevel: import.meta.env.DEV ? 'debug' : 'info',
    console: true,
    store: import.meta.env.DEV, // Store logs in development
    maxLogs: 100,
});

/**
 * Create a scoped logger with context
 * 
 * @example
 * ```typescript
 * const formLogger = createScopedLogger('ContentForm');
 * formLogger.info('Form loaded'); // [ContentForm] Form loaded
 * ```
 */
export function createScopedLogger(scope: string): Logger {
    return {
        debug: (msg, ctx) => logger.debug(`[${scope}] ${msg}`, ctx),
        info: (msg, ctx) => logger.info(`[${scope}] ${msg}`, ctx),
        warn: (msg, ctx) => logger.warn(`[${scope}] ${msg}`, ctx),
        error: (msg, ctx) => logger.error(`[${scope}] ${msg}`, ctx),
        getLogs: () => logger.getLogs(),
        getLogsByLevel: (level) => logger.getLogsByLevel(level),
        clearLogs: () => logger.clearLogs(),
        exportLogs: () => logger.exportLogs(),
        getStats: () => logger.getStats(),
    } as Logger;
}
