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

module.exports = {
  newRecipeMod,
};