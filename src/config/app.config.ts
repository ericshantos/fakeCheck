export default () => ({
    env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
    port: Number(process.env.APP_PORT) || 3000,
    debug: process.env.NODE_ENV ? true : false,
    logging: process.env.NODE_ENV ? 'verbose' : 'error',
});