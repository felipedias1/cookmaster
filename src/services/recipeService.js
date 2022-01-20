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

module.exports = {
  newRecipeServ,
  getRecipesServ,
};