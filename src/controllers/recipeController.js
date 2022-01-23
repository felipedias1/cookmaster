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

const getRecipesByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipeById = await recipe.getRecipesByIdServ(id);
    return res.status(200).json(recipeById);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

const updateRecipesByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId, role } = req.user;
    const recipeById = await recipe
      .updateRecipesByIdServ(req.body, id, userId, role);
    return res.status(200).json(recipeById);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

const deleteRecipesByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId, role } = req.user;
    await recipe.deleteRecipesByIdServ(id, userId, role);
    return res.status(204).json();
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

const addRecipeImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;
    const { _id: userId, role } = req.user;
    const recipeData = await recipe.addRecipeImageServ(id, filename, role, userId);
    return res.status(200).json(recipeData);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

module.exports = {
  newRecipeController,
  getRecipesController,
  getRecipesByIdController,
  updateRecipesByIdController,
  deleteRecipesByIdController,
  addRecipeImage,
};