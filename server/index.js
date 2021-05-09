'use strict'

const http = require('http');
const fs = require('fs');
const debug = require('debug');
const path = require('path')

const log = debug('server')

const server = http.createServer((req, res) => {
    log('request', req.url);

    let file = 'index.html';

    if (req.url !== '/') {
        file = req.url.replace('/', '');
    }

    fs.readFile(`dist/${file}`, (err, data) => {
        if (err) {
            log('error', err);
            res.end();
            return;
        }

        let contentType = 'text/plain';

        switch(path.extname(file)) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.html':
                contentType = 'text/html';
                break;
            case '.css':
                contentType = 'text/css';
                break;
        }

        res.setHeader('Content-Type', contentType)
        res.write(data);
        res.end();
    })
});

const port = 8080;

server.listen(port);