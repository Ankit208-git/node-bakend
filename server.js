const http = require('http');
const app = require('./backend/app');

const port = process.env.Port || 4000

app.set('port', port)
const server = http.createServer(app)
server.listen(port);