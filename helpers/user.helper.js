const User = require('../models/user.model')

async function findLastInsertedUser(){
  try {
    const result = await User.find({}).sort({_id: -1}).limit(1);
    return result[0];
  } catch (err) {
    console.log(`Error while fetching user -- ${err}`)
    return false
  }
}

module.exports = { findLastInsertedUser }