const express = require('express')
const axios = require('axios');
const http = require('http')
const {Server} = require ('socket.io')


const router_server = require("./router/router_server");
const router_mensajes= require("./router/router_mensajes");

const app = express();

app.set('views', './public/views')
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true  }));
app.use( express.static(__dirname + '/public'))


const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/api/products', router_server);
app.use('/api/sms', router_mensajes);


io.on('connection', socket => {
    console.log('Somebody connected');

    socket.on('crearproduct',  message=> { 
        axios({
            method: 'post',
            url:'/api/sms', 
            baseURL: 'http://localhost:8080', 
            data: message 
        })
        .then((response) => {
            if (response.status === 200) {
                io.sockets.emit('allsms', [response.data.message]);
            } else {
                console.log('Fail');
            }
        })
        .catch((e) => console.error(e));


    })

    socket.on('addmessage', products => {
        axios({
            method: 'post',
            url:'/api/products', 
            baseURL: 'http://localhost:8080', 
            data: products 
        })
        .then((response) => {
            if (response.status === 200) {
                io.sockets.emit('allproducts', [response.data.products]);
            } else {
                console.log('Fail');
            }
        })
        .catch((e) => console.error(e));

    })
})


const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log('Running...');
})
