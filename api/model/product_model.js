//importando a biblioteca do mongoDB
const mongoose = require("mongoose");

//Criando o esquema do produto
const produtosSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    nome: { type: String, required: true, unique: true, trim: true},
    descricao: { type: String, required: true , trim: true},
    preco: { type: Number, required: true, min: 0, trim: true },
    categoria: { type: String, required: true, trim: true},
    img: { type: String }
}, 
{ 
    versionKey: false,  // Remove o campo __v
    toJSON: { virtuals: false, transform: (doc, ret) => { delete ret._id, ret.__v; } }  // Remove o campo _id no retorno
});

const Produto = mongoose.model("produto", produtosSchema);

module.exports = Produto;