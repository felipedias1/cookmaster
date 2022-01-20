const express = require('express');
const path = require('path');
const errorMiddleware = require('../middlewares/error');
const user = require('../controllers/userController');
const login = require('../controllers/login');
const recipe = require('../controllers/recipeController');
const auth = require('../middlewares/auth');

const app = express();

app.use(express.json());

app.post('/users', user.newProductController);
app.post('/login', login.login);
app.post('/recipes', auth, recipe.newRecipeController);
app.get('/recipes', recipe.getRecipesController);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(errorMiddleware.error);

module.exports = app;
