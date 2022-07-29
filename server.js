const express = require('express')
const http = require('http')
const app = express();
const {Server} = require ('socket.io')
const server = http.createServer(app)
const io = new Server(server)
const Contenedor = require('./contenedor');
const Contenedor2 = require('./contenedor_mensajes');

const router_server = require("./router/router_server");
const router_mensajes= require("./router/router_mensajes");
const mensajes = new Contenedor2('chat.txt');
const product = new Contenedor('productos.txt');

app.set('views', './public/views')
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true  }));
app.use( express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/api/products', router_server);
app.use('/api/sms', router_mensajes);


io.on('connection', socket => {
    console.log('Somebody connected');

    socket.on('chat-in',  message=> { 
        mensajes.save(message)
        const messageOut = message
        console.log(messageOut)
        io.sockets.emit('chat-out',messageOut)
        
    })

    socket.on('listproducts-in', products => {
        product.save(products)
        const productsOut = products
        console.log(productsOut)
        io.sockets.emit('listproducts-out',productsOut)
    })
})


const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log('Running...');
})
