//importando a biblioteca do mongoDB
const mongoose = require("mongoose");

//Criando o esquema do produto
const produtosSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    nome: { type: String, required: true, unique: true},
    descricao: { type: String, required: true },
    preco: { type: Number, required: true, min: 0 },
    quantidade: { type: Number, required: true, min: 0 },
    img: { type: String }
}, 
{ 
    versionKey: false,  // Remove o campo __v
    toJSON: { virtuals: false, transform: (doc, ret) => { delete ret._id, ret.__v; } }  // Remove o campo _id no retorno
});

const Produto = mongoose.model("produto", produtosSchema);

module.exports = Produto;