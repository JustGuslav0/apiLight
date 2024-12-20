const connectDB = require('./api/config/database.js');

const productRoutes = require('./api/routes/product_routes.js');

const usersRoutes = require('./api/routes/users_routes.js');

const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/products', productRoutes);
app.use('/users', usersRoutes);  

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});