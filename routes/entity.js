var express = require('express');
var {
  addEntity,
  getEntities,
  getEntityById,
  editEntity,
  deleteEntity
} = require('../controllers/entity');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await getEntities();
  res.send(JSON.stringify(result));
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const entity = await getEntityById(id);
  entity.addLogRecord(Date.now(), 'get request');
  res.send(JSON.stringify(entity));
});

router.post('/', (req, res, next) => {
  const body = req.body;
  res.send(`POST request with body ${body}`);
  addEntity(body);
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const result = editEntity(id, body);
  res.send(`Entity edited ${result}`);
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  const result = deleteEntity(id);
  res.send(`Entity deleted ${result}`);
})

module.exports = router;
