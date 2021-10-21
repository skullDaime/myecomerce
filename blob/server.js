const express = require('express');
const path = require('path');

const app = express();

const server = require('http').createServer(app);

app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

const host = '192.168.0.105';
const port = "3000";

console.log("Servidor rodando em http://"+host+":"+port);

server.listen(port);