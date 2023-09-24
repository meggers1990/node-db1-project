const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where("id", id).first();
};

const create = (account) => {
  return db("accounts")
    .insert(account)
    .then(([accountId]) => getById(accountId));
};

const updateById = (id, account) => {
  return db("accounts")
    .where("id", id)
    .update(accountData)
    .then(() => getById(id));
};

const deleteById = (id) => {
  return getById(id).then((deletedAccount) => {
    return db("accounts")
      .where("id", id)
      .delete()
      .then(() => deletedAccount);
  });
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};