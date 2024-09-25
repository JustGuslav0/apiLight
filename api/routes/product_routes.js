const express = require('express');
const router = express.Router();
const productController = require("../controllers/product_controller")

//rota para criar um produto
router.post('/create', productController.createProduct);
//rota para buscar todos os produtos
router.get('/', productController.getProducts);
//rota para deletar um produto específico
router.delete('/produtos/:nome', productController.deleteProduct);
//rota para atualizar um produto específico
router.put('/produtos/:nome' , productController.updateProduct)


module.exports = router