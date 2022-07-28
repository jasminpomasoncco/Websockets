const { Router } = require('express');
const Contenedor2 = require('../contenedor_mensajes');
const mensajes = new Contenedor2('chat.txt');
const router_mensajes= Router()

router_mensajes.get('/', async (req, res) => { 
    try {
        const sms = mensajes.getAll()
    res.json({sms})

    } catch (error) {
        res.status(404).json({error : 'Error to load data'})
    }

})




module.exports = router_mensajes