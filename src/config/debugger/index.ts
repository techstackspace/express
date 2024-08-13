import debug from 'debug';

const isDevMode = process.env.NODE_ENV === 'development';

const log = isDevMode ? debug('app:log') : console.log;
const error = isDevMode ? debug('app:error') : console.error;

export { log, error };
