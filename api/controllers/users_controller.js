const jwt = require('jsonwebtoken');
const User = require('../model/users_model'); // Importando o modelo de usuário
const { error } = require('console');

const JWT_SECRET = 'secrettoken';

///router.post(/register)

exports.registerUser = async (req, res) => {
try{
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já está cadastrado.', error: error.message });
    }
  if (!name || !email || !password){
    return res.status(400).json({ message: "Por favor, preencha todos os campos obrigatórios." });
  }
  
  const lastUser = await User.findOne().sort({ id: -1 });

  const newId = lastUser ? lastUser.id + 1 : 1;

  const user = new User({
      id: newId,
      name: name,
      email: email,
      password: password,
      createdAt: req.body.createdAt,
  });





 
  await user.save();    
  res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
} catch(error){
  return res.status(500).json({ message: 'Erro ao criar usuário.', error: error.message });
}  
}

exports.getUser = async (req, res) => {
  try {
      const produtos = await User.find();
      res.status(200).json(produtos);
    } catch (err) {
      res.status(400).json({ message: "Erro ao buscar usuários", err });
    }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email não encontrado.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({token, message: 'Login bem-sucedido!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao realizar login.', error: error.message});
    }
}

exports.deleteUser = async (req, res) => {
    const idUser = req.params.id;
    try {
        const userDeletado = await User.findOneAndDelete({ id: idUser });

        if (!userDeletado) {
            return res.status(404).json({ message: "User não encontrado", error:error.message });
        }
        res.status(200).json({ message: "User deletado", product: userDeletado });
    } catch (error) {
        // Log o erro completo no console para inspeção
        console.error("Erro ao deletar user:", error);

        // Enviar detalhes do erro ao cliente
        res.status(500).json({ message: 'Erro ao deletar user', error: error.message });
    }
};