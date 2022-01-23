const express = require('express');
const path = require('path');
const multer = require('multer');
const errorMiddleware = require('../middlewares/error');
const user = require('../controllers/userController');
const login = require('../controllers/login');
const recipe = require('../controllers/recipeController');
const auth = require('../middlewares/auth');

const app = express();

app.use(express.json());

// images
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// path da pasta onde será armazenada a imagem
const uploads = path.resolve(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, uploads),
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const uploadImage = multer({ storage });

// users
app.post('/users', user.newProductController);
app.post('/login', login.login);

// recipes
app.put('/recipes/:id/image', auth, uploadImage.single('image'), recipe.addRecipeImage);
app.get('/recipes/:id', recipe.getRecipesByIdController);
app.put('/recipes/:id', auth, recipe.updateRecipesByIdController);
app.delete('/recipes/:id', auth, recipe.deleteRecipesByIdController);
app.get('/recipes', recipe.getRecipesController);
app.post('/recipes', auth, recipe.newRecipeController);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(errorMiddleware.error);

module.exports = app;
