const { Router } = require('express');
const Contenedor2 = require('../contenedor_mensajes');
const mensaje = new Contenedor2('chat.txt');
const router_mensajes= Router()

router_mensajes.get('/', async (req, res) => { 
    try {
        res.json({
            messages: await mensaje.getAll()
        });
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }

})

router_mensajes.post('/', async (req, res) => { 
    try {
        const messageCreated = await mensaje.save(req.body);
        res.json({
            'mensaje': messageCreated
        })
        
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
})


module.exports = router_mensajes