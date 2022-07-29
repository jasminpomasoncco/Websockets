const { Router } = require('express');
const Contenedor2 = require('../contenedor_mensajes');
const mensaje = new Contenedor2('chat.txt');
const router_mensajes= Router()

router_mensajes.get('/', async (req, res) => { 
    try {
    const mensajes= await mensaje.getAll()
    res.json({
        mensajes: await mensaje.getAll()
    });
    
    } catch (error) {
        res.status(404).json({error : 'Error to load sms'})
    }

})



module.exports = router_mensajes