const { ObjectId } = require('mongodb');
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
  return recipes;
};

const getRecipesByIdMod = async (id) => {
  const connect = await connection();
  const recipes = await connect.collection('recipes').findOne({ _id: ObjectId(id) });
  console.log(recipes);
  return recipes;
};

const updateRecipesByIdMod = async (body, id) => {
  const { name, ingredients, preparation } = body;
  const connect = await connection();
  await connect.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  const recipe = getRecipesByIdMod(id);
  return recipe;
};

const deleteRecipesByIdMod = async (id) => {
  const connect = await connection();
  await connect.collection('recipes')
    .deleteOne({ _id: ObjectId(id) });
};

const addRecipeImageMod = async (filename, id) => {
  const connect = await connection();
  await connect.collection('recipes')
    .updateOne(
      { _id: ObjectId(id) }, { $set: { image: `localhost:3000/src/uploads/${filename}` } },
    );
  const recipe = getRecipesByIdMod(id);
  return recipe;
};

module.exports = {
  newRecipeMod,
  getRecipesMod,
  getRecipesByIdMod,
  updateRecipesByIdMod,
  deleteRecipesByIdMod,
  addRecipeImageMod,
};