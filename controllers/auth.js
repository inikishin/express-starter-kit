const getUsers = async () => {
  return await DB.model('User').find({});
}

module.exports = {
  getUsers
};
