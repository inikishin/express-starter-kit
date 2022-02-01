const { Schema } = DB;

const entitySchema = new Schema({
  name:  String,
  createdAt: { type: Date, default: Date.now },
  log: [{ body: String, date: Date }],
  hidden: { type: Boolean, default: false },
});

entitySchema.methods.addLogRecord = function(date, body) {
  this.log.push({body: body, date: date});
  this.save();
}

const Entity = DB.model('Entity', entitySchema);

module.exports = Entity;
