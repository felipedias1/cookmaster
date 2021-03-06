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
  
  const validate = recipeSchema.validate({ name, ingredients, preparation });
  if (validate.error) throw errorOne;

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

const validateFields = (body, id) => {
  const { name, ingredients, preparation } = body;
  const error = { status: 404, message: { message: 'Invalid entries. Try again.' } };
  const validate = recipeSchema.validate({ name, ingredients, preparation });
  if (validate.error || id.length !== 24) throw error;
};

const updateRecipesByIdServ = async (body, id, userId, role) => {
  // função para validar os campos do body e o id da URL
  validateFields(body, id);
  const errorOne = { status: 404, message: { message: 'recipe not found' } };
  const errorTwo = { status: 404, message: { message: 'missing auth token' } };
  const getRecipeById = await recipe.getRecipesByIdMod(id);
  if (!getRecipeById) throw errorOne;
  if (getRecipeById.userId !== userId && role !== 'admin') throw errorTwo;
  const updatedRecipeById = await recipe.updateRecipesByIdMod(body, id);
  
  return updatedRecipeById;
};

const deleteRecipesByIdServ = async (id, userId, role) => {
  const errorOne = { status: 404, message: { message: 'Invalid entries. Try again.' } };
  const errorTwo = { status: 404, message: { message: 'recipe not found' } };
  const errorThree = { status: 404, message: { message: 'missing auth token' } };
  if (id.length !== 24) throw errorOne;
  const getRecipeById = await recipe.getRecipesByIdMod(id);
  if (!getRecipeById) throw errorTwo;
  if (getRecipeById.userId !== userId && role !== 'admin') throw errorThree;
};

const addRecipeImageServ = async (id, filename, role, userId) => {
  const error = { status: 404, message: { message: 'Invalid entries. Try again.' } };
  /* const errorTwo = { status: 404, message: { message: 'recipe not found' } }; */
  const getRecipe = await recipe.getRecipesByIdMod(id);
  console.log(getRecipe);
  if (id.length !== 24) throw error;
  if (!getRecipe) throw error;
  if (getRecipe.userId !== userId && role !== 'admin') throw error;
  const recipeWithImage = await recipe.addRecipeImageMod(filename, id);
  return recipeWithImage;
};

module.exports = {
  newRecipeServ,
  getRecipesServ,
  getRecipesByIdServ,
  updateRecipesByIdServ,
  deleteRecipesByIdServ,
  addRecipeImageServ,
};