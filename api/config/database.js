const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
"mongodb+srv://guza:naolembro@lightdb.ppqom.mongodb.net/?retryWrites=true&w=majority&appName=LightDB",
    ),
      console.log("Conectado ao banco de dados");
  } catch (err) {
    console.log("Erro ao conectar ao banco de dados", err);
  }
};

module.exports = connectDB;