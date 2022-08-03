const express = require('express')
const http = require('http')
const {Server} = require ('socket.io')
const app = express();
const router_server = require("./router/router_server");
const router_mensajes= require("./router/router_mensajes");

const Contenedor = require('./contenedor');
const product = new Contenedor('productos.txt');
const Contenedor2 = require('./contenedor_mensajes');
const message = new Contenedor2('chat.txt');

const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 8080;

app.set('views', './public/views')
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: false  }));
app.use( express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    const allproducts = product.getAll()
    const allmessages = message.getAll()
    res.render('index', {allproducts, allmessages})
})

app.use('/api/products', router_server);
app.use('/api/messages', router_mensajes);


io.on('connection', socket => {
    console.log('Somebody connected!');

    socket.on('listproduct-in' , products => {
        const productsOut={
            title : products.title,
            price : products.price,
            thumbnail : products.thumbnail
        }
        product.save(productsOut);
        console.log(productsOut)
        io.sockets.emit('listproduct-in', productsOut)
    })

    socket.on('messagess-in' , messages => {
        const day   = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year  = new Date().getFullYear();
        const time  = new Date().toLocaleTimeString()
    const date = `${day}/${month}/${year} ${time}`
        const messagesOut={
            email : messages.email,
            message : messages.message,
            date : date
        }
        message.save(messagesOut);
        console.log(messagesOut)
        io.sockets.emit('messagess-in', messagesOut)
    })

})


server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
server.on('error', (error) => console.error(error));