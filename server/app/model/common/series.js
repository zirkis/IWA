'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const self = process.env.SERVER_IP;

// eslint-disable-next-line new-cap
const serieSchema = new Schema({
  name: {type: String, required: true, unique: true},
  description: {type: String, default: 'NA'},
  posterLink: {type: String},
  productionDate: {type: Date},
  actors: [{type: String}],
  director: {type: String},
  country: {type: String},
  episodes: [{ type: ObjectId, ref: 'Episode' }],
  addedAt: {type: Date, default: Date.now()},
});

const model = mongoose.model('Serie', serieSchema);

module.exports = {
  schema: serieSchema,
  model,
  registry: {
    urlTemplates: {
      self: `${self}/api/series/{id}`,
      relationship: `${self}/api/series/{ownerId}/relationships/{path}`
    }
  }
};
