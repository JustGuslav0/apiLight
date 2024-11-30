const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

    const userSchema = new Schema({
      id: { 
        type: Number, 
        unique: true 
      },
      name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      password: {
        type: String,
        required: true,
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
    },
    { 
        versionKey: false,  // Remove o campo __v
        toJSON: { virtuals: false, transform: (doc, ret) => { delete ret._id, ret.__v; } }  // Remove o campo _id no retorno
    }
);

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar a senha
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Criar o modelo de usuário
const User = mongoose.model('User', userSchema);

module.exports = User;