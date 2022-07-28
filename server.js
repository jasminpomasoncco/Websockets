const express = require('express')
const http = require('http')
const app = express();
const {Server} = require ('socket.io')
const server = http.createServer(app)
const io = new Server(server)

const router_server = require("./router/router_server");
const router_mensajes= require("./router/router_mensajes");


app.set('views', './public/views')
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true  }));
app.use( express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.redirect('/api/products')
})

app.use('/api/products', router_server);
app.use('/api/products', router_mensajes);

io.on('connection', socket => {
    console.log('Somebody connected');

    socket.on('chat-in',  message=> {
        const date = new Date()
        const messageOut = {
            sms: message.sms,
            email: message.email,
            date
        }

        //mensajes.save(messageOut)
        console.log(messageOut)
        io.sockets.emit('chat-out', messageOut)
    })


    
})


const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log('Running...');
})
