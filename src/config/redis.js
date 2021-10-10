const redis = require('redis');
const {promisify} = require('util')

const client = redis.createClient({
    host: 'localhost',
    port: 6379
})

const GET_ASYNC = promisify(client.get).bind(client);

const SET_ASYNC = promisify(client.set).bind(client);

 module.exports = {
    GET_ASYNC: GET_ASYNC,
    SET_ASYNC: SET_ASYNC,
 };