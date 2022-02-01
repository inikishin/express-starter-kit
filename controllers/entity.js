var Entity = require("../database/models/entity");

const addEntity = (entity) => {
  const newEntity = new Entity({ name: entity.name });
  newEntity.addLogRecord(Date.now(), 'created');
  newEntity.save();
};

const getEntities = async () => {
  const result = await DB.model('Entity').find({});
  return result;
}

const getEntityById = async (id) => {
  const result = await DB.model('Entity').findById(id);
  return result;
}

const editEntity = async (id, data) => {
  let entity = await DB.model('Entity').findById(id);
  Object.keys(data).forEach(item => {
    entity[item] = data[item];
  })
  await entity.save();
  return true;
}

const deleteEntity = async (id) => {
  const result = await Entity.deleteOne({ _id: id });
  return result;
}

module.exports = {
  addEntity,
  getEntities,
  getEntityById,
  editEntity,
  deleteEntity
};
