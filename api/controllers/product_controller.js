const { error } = require("console");
const Produto = require("../model/product_model");


exports.createProduct = async (req, res) => {
      try {
          const existingItem = await Produto.findOne({ nome: req.body.nome });

          if (existingItem) {
              return res.status(400).json({ message: 'Um item com este nome já existe.' });
          }
          
          const lastProduto = await Produto.findOne().sort({ id: -1 });

          const newId = lastProduto ? lastProduto.id + 1 : 1;

          const produto = new Produto({
              id: newId,
              nome: req.body.nome,
              descricao: req.body.descricao,
              preco: req.body.preco,
              quantidade: req.body.quantidade,
          });
          
          await produto.save();
          res.status(201).json({ message: "Produto criado com sucesso!" });
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar produto", err: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (err) {
    res.status(400).json({ message: "Erro ao buscar produtos", err });
  }
};

exports.deleteProduct = async (req, res) => {
    const nomeProduto = parseInt(req.params.nome);
    try {
        const produtoDeletado = await Produto.findOneAndDelete({ nome: nomeProduto });

        if (!produtoDeletado) {
            return res.status(404).json({ message: "Produto não encontrado", error:error.message });
        }

        res.status(200).json({ message: "Produto deletado", product: produtoDeletado });
    } catch (error) {
        // Log o erro completo no console para inspeção
        console.error("Erro ao deletar produto:", error);

        // Enviar detalhes do erro ao cliente
        res.status(500).json({ message: 'Erro ao deletar produto', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
  const nomeProduto = req.params.nome;
    const atualizacoes = req.body; // Os dados a serem atualizados

    try {
        // Procura o produto pelo nome e o atualiza
        const produtoAtualizado = await Produto.findOneAndUpdate(
            { nome: nomeProduto }, // critério de busca
            atualizacoes,          // dados para atualizar
            { new: true, runValidators: true } // retorna o documento atualizado e aplica validações
        );

        if (!produtoAtualizado) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }

        res.status(200).json({ message: "Produto atualizado com sucesso", product: produtoAtualizado });
    } catch (error) {
        console.error("Erro ao atualizar produto:", error); // Log do erro
        res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
    }
  };