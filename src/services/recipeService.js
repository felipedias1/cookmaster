const JOI = require('@hapi/joi');
const recipe = require('../models/recipeModel');
/* const authService = require('./authService'); */

const recipeSchema = JOI.object({
  name: JOI.string().required(), 
  ingredients: JOI.string().required(), 
  preparation: JOI.string().required(),
});

const newRecipeServ = async (name, ingredients, preparation, userId) => {
  const errorOne = { status: 400, message: { message: 'Invalid entries. Try again.' } };
  /* const errorTwo = { status: 409, message: { message: 'Email already registered' } }; */
  
  const validate = recipeSchema.validate({ name, ingredients, preparation });
  if (validate.error) throw errorOne;

  /* const searchEmail = await user.searchEmail(email);
  if (searchEmail) throw errorTwo;  */

  const newRecipe = await recipe.newRecipeMod(name, ingredients, preparation, userId);

  return newRecipe;
};

const getRecipesServ = async () => {
  const getAllRecipes = await recipe.getRecipesMod();
  return getAllRecipes;
};

const getRecipesByIdServ = async (id) => {
  const error = { status: 404, message: { message: 'recipe not found' } };
  if (id.length !== 24) throw error;
  const getRecipeById = await recipe.getRecipesByIdMod(id);
  if (!getRecipeById) throw error;
  return getRecipeById;
};

module.exports = {
  newRecipeServ,
  getRecipesServ,
  getRecipesByIdServ,
};