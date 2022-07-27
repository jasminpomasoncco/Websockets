const { Router } = require('express');
const Contenedor = require('../contenedor');
const product = new Contenedor('productos.txt');
const router_server= Router()

router_server.get('/', async (req, res) => { 
    try {
        const products= await product.getAll()
        res.render('index.ejs', {products})

    } catch (error) {
        res.status(404).json({error : 'Error to load data'})
    }

})


router_server.get('/:id', async (req, res) => { 
    try {
        const num_id=await product.getById(+req.params.id);

        if(!num_id){

            return res.json({error: 'Producto no encontrado'})

        }return res.json({producto : num_id})

    } catch (error) {
        res.status(404).json({error : 'Error to load data'})
    }
 })

 router_server.post('/', async (req, res) => { 
    try {
        const new_product = await product.save(req.body);
        res.redirect('/api/products')
    } catch (error) {
        res.status(404).json({error : 'Error to load data'})
    }
})
router_server.put('/:id', async (req, res) => { 
    try {
        const mensaje = await product.updateById(+req.params.id, req.body);
        if(!mensaje){
            return res.json({
                error: `Producto de id: ${+req.params.id} no encontrado`
            })
        }
        return res.json({mensaje});
    } catch (error) {
        res.status(404).json({error : 'Error to load data'})
    }
 })
router_server.delete('/:id', async (req, res) => { 
    const id = parseInt(req.params.id);
    try {

        product.deleteById(+req.params.id)

        return res.json({mensaje: 'Producto eliminado'})

    } catch (error) {
        res.status(404).json({error : 'Error to load data'})
    }
 })

module.exports = router_server