/* const { ObjectId } = require('mongodb'); */
const connection = require('./connection');

const newRecipeMod = async (name, ingredients, preparation, userId) => {
  const connect = await connection();

  const { insertedId } = await connect.collection('recipes').insertOne({
      name,
      ingredients,
      preparation,
      userId,
  });
  return { recipe: { name, ingredients, preparation, userId, _id: insertedId } };
};

const getRecipesMod = async () => {
  const connect = await connection();
  const recipes = await connect.collection('recipes').find().toArray();
  console.log(recipes);
  return recipes;
};

module.exports = {
  newRecipeMod,
  getRecipesMod,
};