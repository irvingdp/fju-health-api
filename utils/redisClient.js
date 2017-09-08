const redis = require('redis');
const bluebird = require('bluebird');
const Config = require('../config');
const log4js = require('log4js');
const logger = log4js.getLogger();

//TODO: (Erwin) unit test: missing - also redis client should be mocked
//TODO: (Erwin) What to do if redis server is down?
//- Promisify redis client, clone all functions with suffix '~Async`
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
    host: Config.redis.host,
    port: Config.redis.port,
});

client.on("connect", function () {
    logger.debug('redis connected');
});

/**
 * WARNING:
 * DO NOT REMOVE THIS LISTENER
 * This listener: on.('error', ...) is required to be set so that
 * Express would not EXIT when redis cannot be reached!!!
 */
client.on('error', (err) => {
    logger.error('Redis encountered an error');
    logger.error(err);
});




module.exports = client;