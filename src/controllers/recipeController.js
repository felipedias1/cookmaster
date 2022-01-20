const recipe = require('../services/recipeService');

const newRecipeController = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    // criando constante 'userId' que recebe o valor de '_id'
    const { _id: userId } = req.user;
    const newUser = await recipe.newRecipeServ(name, ingredients, preparation, userId);
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

const getRecipesController = async (_req, res, next) => {
  try {
    const allRecipes = await recipe.getRecipesServ();
    return res.status(200).json(allRecipes);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

module.exports = {
  newRecipeController,
  getRecipesController,
};