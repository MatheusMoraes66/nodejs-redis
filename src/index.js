const express = require('express');
const axios = require('axios');
const responseTime = require('response-time')
const {GET_ASYNC, SET_ASYNC} = require('./config/redis.js');
const app = express();

app.use(responseTime())

app.get('/characters', async (req, res) => {
    try {
        const reply = await GET_ASYNC('characters')

        if(reply) return res.json(JSON.parse(reply));
    
        const response = await axios.get('https://rickandmortyapi.com/api/character');
    
        await SET_ASYNC('character', JSON.stringify(response.data))
    
        return res.json(response.data);
    } catch (error) {
        console.log(err);
    }
})

app.get('/characters/:id', async (req, res) => {
    try {
        const reply = await GET_ASYNC(req.params.id)

        if(reply) return res.json(JSON.parse(reply));
    
        const response = await axios.get('https://rickandmortyapi.com/api/character/' + req.params.id);
    
        await SET_ASYNC(req.params.id, JSON.stringify(response.data))
    
        return res.json(response.data);
    } catch (error) {
        console.log(err);
    }
})

app.listen(8080);
console.log('listen on port 8080');