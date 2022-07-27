const express = require('express')
const http = require('http')
const {Server} = require ('socket.io')
const router_server = require("./router/router_server");

const app = express();
const PORT = 8080;

app.set('views', './public/views')
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: false  }));
app.use( express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + './public/index.ejs')
})

app.use('/api/products', router_server);

const server = app.listen(PORT, () => {
    console.log("Servidor levantado en puerto " + server.address().port);
});

