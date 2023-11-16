const url = require('url');
const express = require('express');
const router = express.Router();
const apicache = require('apicache');
const fetch = require('node-fetch');

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = process.env.TMDB_API_KEY;

let cache = apicache.middleware;


router.get('/*', cache('2 minutes'), async (req, res, next) => {
    const params = new URLSearchParams({
        api_key: apiKey,
        ...url.parse(req.url, true).query,
    });
    const path = req.path;

    // Log the request to the public API
    if (process.env.NODE_ENV !== 'production') {
        console.log(`REQUEST: ${baseUrl}${path}?${params}`);
    }

    const URL = `${baseUrl}${path}?${params}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    };

    fetch(URL, options)
        .then(res => res.json())
        .then(json => res.status(200).send(json))
        .catch(err => next(err));
});

module.exports = router;